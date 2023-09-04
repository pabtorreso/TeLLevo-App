import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { PasajeroModel } from '../models/PasajeroModel';
import { TipoPasajeroModel } from '../models/TpoPasajeroModel';


@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PasajeroPage implements OnInit {

  pasajeroInfoReceived: PasajeroModel | undefined;
  idUserHtmlRouterLink: any;
  tipoPasajeroReceived: TipoPasajeroModel;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {

    this.tipoPasajeroReceived = this.router.getCurrentNavigation()?.extras.state?.['tipoPasajero'];
    this.pasajeroInfoReceived = this.router.getCurrentNavigation()?.extras.state?.['user'];
    // Si quiero obtener un valor por URL usando routerLink
    this.idUserHtmlRouterLink = this.activatedRoute.snapshot.params['id'];
    // Obteniendo el ID podria buscar en algún arreglo o BD el usuario con el id
    console.log("Valor obtenido desde URL: ",this.idUserHtmlRouterLink);
   }

  ngOnInit() {
  }



}