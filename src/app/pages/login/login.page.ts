import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { UsuarioService } from '../../services/supabase/usuario.service'; // Ruta corregida para el servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {
  nombreUsuario: string = '';
  contrasena: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async iniciarSesion() {
    console.log('Intento de inicio de sesión con el nombre de usuario:', this.nombreUsuario);

    // Llama al servicio para verificar las credenciales del usuario
    const usuarioValido = await this.usuarioService.verificarCredenciales(this.nombreUsuario, this.contrasena);

    if (usuarioValido) {
      console.log('Inicio de sesión exitoso. Redirigiendo al usuario a la página principal.');

      // Imprimir el estado de autenticación en la consola
      console.log('Usuario autenticado:', this.usuarioService.estaAutenticado());

      // Autenticación exitosa, redirige al usuario a la página principal
      this.router.navigate(['/home']);

      // Mostrar un toast de inicio de sesión exitoso
      const toast = await this.toastController.create({
        message: 'Sesión iniciada con éxito',
        duration: 2000, // Duración del toast en milisegundos
        position: 'top', // Posición del toast
      });
      toast.present();
    } else {
      console.error('Credenciales inválidas');
      // Autenticación fallida, muestra un mensaje de error o realiza alguna acción adecuada
      // Puedes mostrar un mensaje de error en tu interfaz de usuario

      // Mostrar un toast de credenciales inválidas
      const toast = await this.toastController.create({
        message: 'Credenciales inválidas',
        duration: 2000, // Duración del toast en milisegundos
        position: 'top', // Posición del toast
        color: 'danger', // Color del toast
      });
      toast.present();
    }
  }

  irARegister() {
    // Navega a la página de registro cuando se hace clic en el enlace
    this.router.navigate(['/register']);
  }
}
