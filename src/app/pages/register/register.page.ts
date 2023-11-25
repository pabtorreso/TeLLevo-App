import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgForOf } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router, RouterLinkWithHref, } from '@angular/router';
import { UserService } from 'app/services/user.service';
import { UserModel } from 'app/models/UserModel';
import { HttpClientModule } from '@angular/common/http';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule, HttpClientModule, NgFor, NgForOf],
  providers: [UserService]
})

export class RegisterPage implements OnInit { //OnDestroy

  userRegisterModal: Partial<UserModel> = {
    first_name: '',
    last_name: '',
    userType: '',
    jornada: '',
    phone: '',
    email: '',
    password: ''
  };

  confirmPassword: string = '';


  public userExists?: UserModel;
  public userList: UserModel[] = [];

  constructor(private route: Router, private _usuarioService: UserService, public toastController: ToastController ) {
  }

  //ngOnDestroy(): void {
  //  throw new Error('Method not implemented.');
  //}

  ngOnInit(): void {
    this.userRegisterModalRestart();
  }

  async setObject(user: UserModel) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  async registerUser() {
    if (!this.allFieldsValid()) {
      this.presentToast('Por favor, completa todos los campos.');
      return;
    }
    if (!this.passwordsMatch()) {
      this.presentToast('Las contraseñas no coinciden.');
      return;
    }
    try {
      const response = await lastValueFrom(this._usuarioService.addNewUser(this.userRegisterModal));
      console.log(response);
      this.presentToast('Usuario registrado con éxito!');
      this.goToLogin();
    } catch (error) {
      console.error(error);
      this.presentToast('Hubo un error al registrar el usuario. Por favor, intenta nuevamente.');
    }
  }

  // Utiliza este método para presentar toasts
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    await toast.present();
  }

  // Método para verificar que todos los campos estén llenos
  allFieldsValid(): boolean {
    return !!this.userRegisterModal.first_name && !!this.userRegisterModal.last_name &&
           !!this.userRegisterModal.userType && !!this.userRegisterModal.jornada &&
           !!this.userRegisterModal.phone && !!this.userRegisterModal.email &&
           !!this.userRegisterModal.password;
  }

  // Método para verificar que las contraseñas coincidan
  passwordsMatch(): boolean {
    return this.userRegisterModal.password === this.confirmPassword;
  }

  userRegisterModalRestart(): void {
    this.userRegisterModal.email = '';
    this.userRegisterModal.password = '';
  }

  goToLogin(): void {
    this.route.navigate(['/login']); 
  }

}
