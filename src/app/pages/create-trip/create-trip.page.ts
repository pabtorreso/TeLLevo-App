import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { TripsService } from 'app/services/trips.service';
import { TripsModel } from 'app/models/TripsModel';
import { Observable } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.page.html',
  styleUrls: ['./create-trip.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class CreateTripPage {

  trip: Partial<TripsModel> = {
    origin: '',
    destination: '',
    availableSeats: 4,
    driver_id: ''
  };

  constructor(private tripsService: TripsService, private router: Router) { }

  async getCurrentUserId(): Promise<string> {
    try {
      const { value } = await Preferences.get({ key: 'userId' });
      if (value) {
        return value;
      } else {
        console.error('El userId es null o undefined en Preferences.');
        return '';
      }
    } catch (error) {
      console.error('Error al obtener el userId:', error);
      return '';
    }
  }

  async onSubmit() {
    const userId = await this.getCurrentUserId();
  
    if (!userId) {
      console.error('No se pudo obtener el ID del usuario');
      return;
    }
  
    this.trip.driver_id = userId;
  
    if (!this.trip.origin || !this.trip.destination || !this.trip.availableSeats) {
      console.error('Faltan datos obligatorios del viaje');
      return;
    }
  
    console.log("Datos del viaje a crear:", this.trip);
  
    this.tripsService.createTrip(this.trip).subscribe(async response => {
      console.log('Viaje creado exitosamente!', response);
      
      const trips = await this.tripsService.getTripsByUserId(userId).toPromise();
      
      if (trips && trips.length > 0) {
        const lastTrip = trips[trips.length - 1];
        this.router.navigate(['/trip-detail', lastTrip.trip_id]);
      } else {
        console.error('Viaje creado pero no se pudo obtener el ID del viaje más reciente del conductor.');
      }
    }, error => {
      console.error('Hubo un error al crear el viaje:', error.error);
    });
  }
  
  onCancel() {
    this.router.navigate(['/user-type-menu']);
  }
}