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
    driver_id: ''  // Se seteará antes de enviar.
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
      // Aquí podrías mostrar un mensaje de error al usuario.
      return;
    }
  
    this.trip.driver_id = userId;
  
    // Validaciones adicionales (como un ejemplo)
    if (!this.trip.origin || !this.trip.destination || !this.trip.availableSeats) {
      console.error('Faltan datos obligatorios del viaje');
      // Informar al usuario que faltan datos
      return;
    }
  
    // Imprimir los datos del viaje para depuración
    console.log("Datos del viaje a crear:", this.trip);
  
    // Llamada al servicio para crear el viaje
    this.tripsService.createTrip(this.trip).subscribe(async response => {
      console.log('Viaje creado exitosamente!', response);
      
      // Aquí haces la llamada para obtener el último viaje creado por ese conductor
      const trips = await this.tripsService.getTripsByUserId(userId).toPromise();
      
      if (trips && trips.length > 0) {
        // Suponiendo que el último viaje del array es el más reciente
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