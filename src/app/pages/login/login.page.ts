import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgForOf } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLinkWithHref, } from '@angular/router';
import { IUserLogin } from 'app/models/IUserLogin';
import { UserService } from 'app/services/user.service';
import { UserModel } from 'app/models/UserModel';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule, NgFor, NgForOf],
  providers: [UserService]
})

export class LoginPage implements OnInit {

  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };

  constructor(
    private route: Router, 
    private _usuarioService: UserService,
    public toastController: ToastController
  ) {}

  ngOnInit(): void {
    // Aquí podrías también verificar si el usuario ya está logueado y redirigirlo
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentSuccessToast() {
    const toast = await this.toastController.create({
      message: 'Sesión iniciada con éxito.',
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async userLogin(userLoginInfo: IUserLogin) {
    try {
      const user_id = await lastValueFrom(this._usuarioService.getLoginUser(userLoginInfo));
  
      if (user_id) {
        console.log("Usuario valido");
        await this.setUserPreference('userId', user_id.toString());
        this.navigateToUserMenu(user_id);
        this.presentSuccessToast();
      } else {
        console.log("Datos inválidos");
        this.presentToast("Credenciales incorrectas, por favor intente nuevamente.");
      }
    } catch (error) {
      if (error instanceof TypeError && 
          (error.message.includes("You provided an invalid object where a stream was expected") || 
           error.message.includes("Cannot read properties of undefined"))) {
        this.presentToast("Datos inválidos, por favor intente nuevamente.");
      } else {
        console.error("Hubo un error durante el inicio de sesión:", error);
        this.presentToast("Error al iniciar sesión, por favor intente nuevamente.");
      }
    }
  }

  async setUserPreference(key: string, value: string) {
    await Preferences.set({ key: key, value: value });
  }

  navigateToUserMenu(user_id: string): void {
    this.route.navigate(['/user-type-menu'], { state: { userInfo: user_id }});
  }

  userLoginModalRestart(): void {
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

  goToRegister(): void {
    this.route.navigate(['/register']); 
  }
}
