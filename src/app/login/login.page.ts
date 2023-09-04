import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router, NavigationExtras, RouterLinkWithHref } from '@angular/router';
import { IUserLogin } from '../models/IUserLogin';
import { TipoUsuarioModel } from '../models/TipoUsuarioModel';
import { UserModel } from 'src/app/models/UserModel';
import { PasajeroModel } from '../models/PasajeroModel';
import { ConductorModel } from '../models/ConductorModel';
import { TipoPasajeroModel } from '../models/TpoPasajeroModel';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterLinkWithHref, FormsModule],
})
export class LoginPage implements OnInit {
  listTipoPasajero: TipoPasajeroModel[] = [
    new TipoPasajeroModel(1, 'ESTUDIANTE'),
    new TipoPasajeroModel(2, 'DOCENTE'),
    new TipoPasajeroModel(3, 'COLABORADOR'),
  ];

  listTipoUsuario: TipoUsuarioModel[] = [
    new TipoUsuarioModel(1, 'PASAJERO'),

    new TipoUsuarioModel(2, 'CONDUCTOR'),
  ];

  listUser: UserModel[] | PasajeroModel[] | ConductorModel[] = [
    new PasajeroModel(
      'ESTEBAN',
      'JARA',
      'GONZALEZ',
      '912312334',
      'ejemplo@ejemplo.cl',
      undefined,
      'VESPERTINA',
      'eg.gonzalezj',
      'es123456',
      this.listTipoUsuario[0].id_tipo_usuario,
      this.listTipoPasajero[0].id_tipo_pasajero
    ),

    new ConductorModel(
      'PABLO',
      'TORRES',
      'OYARZUN',
      '987342422',
      'ejemplo@ejemplo.cl',
      undefined,
      'VESPERTINA',
      'p.oyarzunt',
      'pa123456',
      this.listTipoUsuario[1].id_tipo_usuario,
      2,
      'XD-WF-12'
    ),
  ];

  userLoginModal: IUserLogin = {
    username: '',
    password: '',
  };

  constructor(private route: Router) {}

  ngOnInit() {
    this.userLoginModalRestart();
  }

  userLogin(userLoginInfo: IUserLogin): boolean {
    for (let i = 0; i < this.listUser.length; i++) {
      
      if (
        this.listUser[i].username == userLoginInfo.username &&
        this.listUser[i].password == userLoginInfo.password
      ) {
        console.log(
          'User Loged...',
          this.userLoginModal.username,
          this.userLoginModal.password
        );
        let userInfoSend: NavigationExtras = {
          state: {
            user: this.listUser[i],
          },
        };

        if (this.listUser[i].id_tipo_usuario == 1) {
          let sendInfo = this.route.navigate(['/pasajero'], userInfoSend);
          return true;
        } else {
          let sendInfo = this.route.navigate(['/conductor'], userInfoSend);
          return true;
        }
      }

      
    }
    this.userLoginModalRestart();
    return false;
  }

  userLoginModalRestart(): void {
    this.userLoginModal.username = '';
    this.userLoginModal.password = '';
  }


}
