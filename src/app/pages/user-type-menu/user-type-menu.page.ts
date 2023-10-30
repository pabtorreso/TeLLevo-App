import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { TripsService } from 'app/services/trips.service';
import { UserModel } from 'app/models/UserModel';
import { TripsModel } from 'app/models/TripsModel';
import { Observable, Subscription } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-user-type-menu',
  templateUrl: './user-type-menu.page.html',
  styleUrls: ['./user-type-menu.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class UserTypeMenuPage implements OnInit, OnDestroy {
  relatedTrip: TripsModel | null = null;

  userInfo$: Observable<UserModel>;
  user_id: string;

  user: UserModel | null = null; // Agregamos esta propiedad
  userSubscription: Subscription | null = null; // Agregamos esta propiedad

  constructor(private router: Router, private _userService: UserService, private _tripsService: TripsService ) { 
    this.user_id = this.router.getCurrentNavigation()?.extras.state?.['userInfo'];
    this.userInfo$ = this._userService.getUser(this.user_id);
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // Suscribirse al observable userInfo$ para obtener el objeto user
    this.userSubscription = this.userInfo$.subscribe(userInfo => {
      this.user = userInfo;
      this.getRelatedTrip();
    });
    // Llama a la función que verifica el viaje relacionado
    // cada vez que la página esté a punto de mostrarse
    this.getRelatedTrip();
  }

  ngOnDestroy() {
    // Desuscribirse del observable para evitar fugas de memoria
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  getRelatedTrip() {
    if (this.user) {
      this.relatedTrip = null; // Asegúrate de que se restablezca primero
  
      // Si el usuario es conductor
      if (this.user.userType === 'Conductor' || this.user.userType === 'Ambos') {
        this._tripsService.getTripsByUserId(this.user_id).subscribe(trips => {
          if (trips.length > 0) {
            this.relatedTrip = trips[0];
          }
        });
      }
  
      // Si el usuario es pasajero y aún no tiene un viaje relacionado
      if (!this.relatedTrip && (this.user.userType === 'Pasajero' || this.user.userType === 'Ambos')) {
        this._tripsService.getPassengersForUser(this.user_id).subscribe(passengers => {
          if (passengers && passengers.length > 0 && passengers[0].trip_id) {
            this._tripsService.getTripById(passengers[0].trip_id).subscribe(trip => {
              this.relatedTrip = trip;
            });
          }
        });
      }
    }
  }

  goToTripDetail() {
    if (this.relatedTrip) {
        this.router.navigate([`/trip-detail/${this.relatedTrip.trip_id}`]);
    }
  }

  goToProfile() {
    // Navega a la página de perfil
    this.router.navigate(['/profile'], { state: { userInfo: this.user_id}});
  }

  createTrip() {
    // Navega a la página de crear viaje
    this.router.navigate(['/create-trip']);
  }

  joinTrip() {
    // Navega a la página para unirse a un viaje
    this.router.navigate(['/join-trip']);
  }

  logout() {
    this._userService.logout();
    this.clearUserIdFromPreferences();
    this.checkSession();
  }

  async clearUserIdFromPreferences() {
      try {
          await Preferences.remove({ key: 'userId' });
          console.log("user_id borrado exitosamente");
      } catch (error) {
          console.error("Error al borrar user_id: ", error);
      }
  }

  async checkSession() {
    const user = await Preferences.get({ key: 'user' });
    if (!user || !user.value) {
      console.log("La sesión se cerró correctamente");
    } else {
      console.log("La sesión no se cerró correctamente");
    }
  }  

}