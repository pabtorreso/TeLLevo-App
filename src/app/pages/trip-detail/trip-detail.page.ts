import { Component, OnInit, OnDestroy, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap, takeUntil, tap, map } from 'rxjs/operators';
import { EMPTY, of, Observable, throwError, Subject, forkJoin } from 'rxjs';
import { TripsService } from 'app/services/trips.service';
import { TripDetailModel } from 'app/models/TripDetailModel';
import { PassengersModel } from 'app/models/PassengersModel';
import { UserModel } from 'app/models/UserModel';
import { Preferences } from '@capacitor/preferences';
import { GoogleMap } from '@capacitor/google-maps';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule]
})

export class TripDetailPage implements OnInit, OnDestroy {
  tripDetails$: Observable<TripDetailModel | undefined> = of(undefined); // Valor inicial
  passengers$: Observable<UserModel[] | undefined> = of([]);
  private destroy$ = new Subject<void>();
  currentUser_id!: string;
  @ViewChild('map', { static: false }) mapRef!: ElementRef;
  map: GoogleMap | undefined;

  trackByFn(index: any, item: any) {
    return index; //
  }

  tripDetails: any = {
    origin: '',
    destination: '',
  };
  
  constructor( private _tripsService: TripsService, private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      const userInfo = this.route.snapshot.paramMap.get('userInfo');
      if (userInfo) {
        console.log(userInfo);
      }
    });
  }

  ngOnInit() {
    const trip_id = this.route.snapshot.paramMap.get('id');
    if (trip_id) {
      this.tripDetails$ = this._tripsService.getTripDetails(trip_id).pipe(
        tap((data: TripDetailModel) => {
          console.log('Detalles del viaje:', data);
          this.tripDetails = data; // Actualiza tripDetails con los datos recibidos
          this.loadCurrentUserId(); // Carga el ID del usuario actual y compara con driver_id
          this.loadPassengers(trip_id); // Llama a la función que carga los pasajeros
        }),
        takeUntil(this.destroy$),
        catchError(err => {
          console.error("Hubo un error al obtener los detalles del viaje", err);
          return throwError(err);
        })
      );
    }
    this.loadCurrentUserId();
  }

  ionViewDidEnter() {
    this.createMap();
  }

  async createMap(){
    this.map = await GoogleMap.create({
      id: 'my-map',
      apiKey: environment.googleMapsApiKey,
      element: this.mapRef.nativeElement,
      config:{
        center:{
          lat: -33.033708,
          lng: -71.532975,
        },
        zoom: 18,
      },
    });
  }
  
  loadPassengers(trip_id: string) {
    this._tripsService.getPassengersForTrip(trip_id).pipe(
      takeUntil(this.destroy$),
      tap((passengers: UserModel[]) => {
        console.log('Pasajeros:', passengers);
        // Combina la información de los pasajeros con tripDetails
        this.tripDetails.passengers = passengers;
      }),
      catchError(err => {
        console.error("Hubo un error al obtener los pasajeros", err);
        return throwError(err);
      })
    ).subscribe(passengers => {
    // Crea un nuevo objeto en lugar de mutar el existente
    this.tripDetails = { ...this.tripDetails, passengers: passengers };
    });
  }

  async loadCurrentUserId() {
    const { value } = await Preferences.get({ key: 'userId' });
    if (value) {
      this.currentUser_id = value;
    }
  }

  isDriver(): boolean {
    const isDriverResult = this.currentUser_id == this.tripDetails.driver_id.user_id; 
    return isDriverResult;
 }
  endTrip(trip_id: string) {
    this._tripsService.deleteTrip(trip_id)
      .subscribe(
        () => {
          console.log("Viaje finalizado con éxito");
          this.goToMenu();
        },
        err => {
          console.error("Error al finalizar el viaje", err);
        }
      );
  }

  async leaveTrip(trip: TripDetailModel = this.tripDetails) {
    const currentUserId = this.currentUser_id;
    if (currentUserId) {

        // Aumentar el número de asientos disponibles
        const updatedTrip = {
            trip_id: trip.trip_id,
            availableSeats: trip.availableSeats + 1,
        };
        await this._tripsService.updateTrip(updatedTrip).toPromise();

        // Eliminar al usuario de la lista de pasajeros del viaje
        this._tripsService.removePassenger(trip.trip_id, currentUserId).subscribe(response => {
            console.log('Usuario eliminado del viaje', response);
            this.router.navigate(['/user-type-menu'], { state: { userInfo: currentUserId }});
        });

    } else {
        console.error('Error al obtener el ID del usuario actual.');
    }
  }
  
  async goToMenu() {
    // obtener user_id de Preferences
    const { value } = await Preferences.get({ key: 'userId' });
    
    if (value) {
      this.router.navigate(['/user-type-menu'], { state: { userInfo: value }});
    } else {
      console.error('El ID del usuario no se encontró en las preferencias.');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
