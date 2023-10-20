import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegisterPage implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {}

  irAInicioSesion() {
    this.router.navigate(['login']);
  }

  numrut_usuario: number | null= null;
  dvrun_usuario: string = "";
  nombre_usuario: string = "";
  apellidos_usuario: string = "";
  fecnac_usuario: string= "";
  numtel_usuario: string= "";
  email_usuario: string= "";
  id_tipo_usuario: string= "";
  contrasena_usuario: string= "";
  id_tipo_pasajero: string= "";
  id_jornada: string= "";

  mostrar(){
    console.log(this.numrut_usuario);
  }

}

