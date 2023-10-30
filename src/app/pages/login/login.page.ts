import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgForOf } from '@angular/common';
import { FormsModule, } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
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

export class LoginPage implements OnInit { //OnDestroy

  userLoginModal: IUserLogin = {
    email: '',
    password: ''
  };

  public userExists?: UserModel;
  public userList: UserModel[] = [];

  constructor(private route: Router, private _usuarioService: UserService) {
  }
  
  //ngOnDestroy(): void {
  //  throw new Error('Method not implemented.');
  //}

  ngOnInit(): void {
    this.userLoginModalRestart();
  }

  async setObject(user: UserModel) {
    await Preferences.set({
      key: 'user',
      value: JSON.stringify(user)
    });
  }

  async userLogin(userLoginInfo: IUserLogin) {
    try {
      const user_id = await lastValueFrom(this._usuarioService.getLoginUser(userLoginInfo));
  
      if (user_id) {
        console.log("Usuario existe...");
  
        // Guardar user_id en Preferences
        await Preferences.set({ key: 'userId', value: user_id.toString() });
  
        this.route.navigate(['/user-type-menu'], { state: { userInfo: user_id }});
      } else {
        //NO EXISTE
        console.log("Usuario no existe...");
      }
    } catch (error) {
      console.error("Hubo un error durante el inicio de sesión:", error);
    }
  }

  userLoginModalRestart(): void {
    this.userLoginModal.email = '';
    this.userLoginModal.password = '';
  }

  goToRegister(): void {
    this.route.navigate(['/register']); 
  }
}

