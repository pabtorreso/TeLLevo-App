import { Component, OnInit, OnDestroy, ViewChild, CUSTOM_ELEMENTS_SCHEMA, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, NavController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap, takeUntil, tap, map } from 'rxjs/operators';
import { EMPTY, of, Observable, throwError, Subject, forkJoin } from 'rxjs';
import { TripsService } from 'app/services/trips.service';
import { TripDetailModel } from 'app/models/TripDetailModel';
import { PassengersModel } from 'app/models/PassengersModel';
import { UserModel } from 'app/models/UserModel';
import { Preferences } from '@capacitor/preferences';
import { Circle, GoogleMap, Polyline, Polygon } from '@capacitor/google-maps';
import { environment } from 'environments/environment';
import { GeocodingService } from 'app/services/geocoding.service';

declare var google: any;

@Component({
  selector: 'app-trip-detail',
  templateUrl: './trip-detail.page.html',
  styleUrls: ['./trip-detail.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule, FormsModule]
})

export class TripDetailPage implements OnInit, OnDestroy {
  tripDetails$: Observable<TripDetailModel | undefined> = of(undefined);
  passengers$: Observable<UserModel[] | undefined> = of([]);
  private destroy$ = new Subject<void>();
  currentUser_id!: string;
  @ViewChild('map', { static: false }) mapRef!: ElementRef;
  map: GoogleMap | undefined;
  directionsRenderer = new google.maps.DirectionsRenderer;

  trackByFn(index: any, item: any) {
    return index; //
  }

  tripDetails: any = {
    origin: '',
    destination: '',
    passengers: [],
  };
  
  constructor( 
    private _tripsService: TripsService, 
    private geocodingService: GeocodingService, 
    private route: ActivatedRoute, 
    private router: Router,
    private navCtrl: NavController,
    private platform: Platform) {
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

  async ionViewDidEnter() {
    await this.createMap();
    if (this.tripDetails.origin && this.tripDetails.destination) {
      this.showRoute(this.tripDetails.origin, this.tripDetails.destination);
    }
  }

  async ionViewWillLeave() {
    if (this.map) {
      await this.map.destroy(); // Destruye el mapa cuando el usuario sale de la página
    }
  }

  async createMap(){
    this.map = await GoogleMap.create({
      id: 'trip-map',
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

  async showRoute(origin: string, destination: string) {
    forkJoin({
      originResult: this.geocodingService.geocodeAddress(origin),
      destinationResult: this.geocodingService.geocodeAddress(destination)
    }).subscribe(async ({ originResult, destinationResult }) => {
      if (this.map && originResult && destinationResult) {
        const originCoords = {
          lat: originResult.lat,
          lng: originResult.lng
        };
        const destinationCoords = {
          lat: destinationResult.lat,
          lng: destinationResult.lng
        };
        
        // Agrega los marcadores al mapa
        await this.addMarkerToMap(originCoords, 'Origin');
        await this.addMarkerToMap(destinationCoords, 'Destination');
        
        // Direcciones detalladas de la ruta
        const directionsResult = await this.geocodingService.getRoute(origin, destination).toPromise();
  
        if (directionsResult) {
          // Extrae las coordenadas de la ruta detallada
          const path = directionsResult.routes[0].overview_path.map(p => ({
            lat: p.lat(),
            lng: p.lng()
          }));
  
          // Agrega la polilínea al mapa
          await this.addPolylineToMap(path);
  
          // Calcula el punto central
          const bounds = new google.maps.LatLngBounds();
          path.forEach(point => {
            bounds.extend(new google.maps.LatLng(point.lat, point.lng));
          });
  
          // Calcula el centro y el zoom
          const center = bounds.getCenter();
          const zoom = this.calculateZoomLevel(bounds);
  
          // Actualiza la posición del mapa y el zoom
          await this.map.setCamera({
            coordinate: {
              lat: center.lat(),
              lng: center.lng()
            },
            zoom: zoom
          });
        }
      }
    }, error => {
      console.error('Error obteniendo la ruta: ', error);
    });
  }

  // Calcula el nivel de zoom (basado en los limites)
  calculateZoomLevel(bounds: google.maps.LatLngBounds): number {
    const GLOBE_WIDTH = 256; // un valor base para la anchura del mapa
    let angle = bounds.getNorthEast().lng() - bounds.getSouthWest().lng();
    if (angle < 0) {
      angle += 360;
    }
    const pixelWidth = (this.mapRef.nativeElement.offsetWidth || window.innerWidth);
    let zoomLevel = Math.round(Math.log(pixelWidth * 360 / angle / GLOBE_WIDTH) / Math.LN2);
    zoomLevel -= 0.75;
  
    return Math.max(zoomLevel, 0); // no debe ser negativo
  }

  private async addMarkerToMap(coords: google.maps.LatLngLiteral, title: string) {
    if (this.map) {
      await this.map.addMarker({
        coordinate: {
          lat: coords.lat,
          lng: coords.lng
        },
        title: title
      });
    }
  }

  private async addPolylineToMap(path: google.maps.LatLngLiteral[]) {
    if (this.map) {
      await this.map.addPolylines([{
        path: path,
        strokeColor: '#AA00FF',
        strokeWeight: 5,
        geodesic: true,
      }]);
    }
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
      this.navCtrl.navigateForward(['/user-type-menu'], { state: { userInfo: value }});
    } else {
      console.error('El ID del usuario no se encontró en las preferencias.');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
