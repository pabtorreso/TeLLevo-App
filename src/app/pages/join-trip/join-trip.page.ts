import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import { EMPTY, of, Observable, throwError, Subject } from 'rxjs';
import { TripsService } from 'app/services/trips.service';
import { TripDetailModel } from 'app/models/TripDetailModel';
import { PassengersModel } from 'app/models/PassengersModel';
import { TripsModel } from 'app/models/TripsModel';
import { UserModel } from 'app/models/UserModel';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-join-trip',
  templateUrl: './join-trip.page.html',
  styleUrls: ['./join-trip.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class JoinTripPage implements OnInit, OnDestroy {
  tripDetails$: Observable<TripDetailModel[]> = of([]); 

  private destroy$ = new Subject<void>();

  constructor(private _tripsService: TripsService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.loadTrips();
  }

  private loadTrips() {
    this.tripDetails$ = this._tripsService.getAllTripDetails().pipe(
      tap(tripDetails => {
        console.log('Detalles del viaje disponibles:', tripDetails);
      })
    );
  }

  async joinTrip(trip: TripDetailModel) {
    const currentUserId = await this.getCurrentUserId();
    if (currentUserId) {
        const newPassenger = {
            trip_id: trip.trip_id,
            passenger_id: currentUserId,
        };

        this._tripsService.addPassenger(newPassenger).subscribe(async response => {
            const updatedTrip = {
              trip_id: trip.trip_id,
              availableSeats: trip.availableSeats - 1,
            };
            await this._tripsService.updateTrip(updatedTrip).toPromise();

            this.router.navigate([`/trip-detail/${trip.trip_id}`]);
        });
    } else {
        console.error('Error al obtener el ID del usuario actual.');
    }
  }

  async getCurrentUserId(): Promise<string | null> {
    const { value } = await Preferences.get({ key: 'userId' });
    return value || null;
  }

  async goToMenu() {
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
