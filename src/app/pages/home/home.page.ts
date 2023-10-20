import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { UsuarioService } from '../../services/supabase/usuario.service'; // Ruta corregida para el servicio

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage implements OnInit {

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {}

  cerrarSesion() {
    // Cambia el estado de autenticación a false
    this.usuarioService.establecerAutenticacion(false);

    // Redirige al usuario a la página de inicio de sesión
    this.router.navigate(['/login']);

    // Imprimir el estado de autenticación en la consola
    console.log('Usuario autenticado:', this.usuarioService.estaAutenticado())
  }

}