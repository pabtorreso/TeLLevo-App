import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/supabase/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class RegisterPage implements OnInit {
  numrut_usuario: string = '';
  nombre: string = '';
  apellidos: string = '';
  fechaNacimiento: string = '';
  tipoPasajero: string = '';
  jornada: string = '';
  nombreUsuario: string = '';
  contrasena: string = '';
  repetirContrasena: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async mostrarToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000, // Duración del Toast en milisegundos (3 segundos)
      position: 'top', // Posición del Toast en la parte superior
    });
    toast.present();
  }

  insertarNuevoUsuario() {
    // Verificar que todos los campos obligatorios estén completados
    if (
      !this.numrut_usuario ||
      !this.nombre ||
      !this.apellidos ||
      !this.fechaNacimiento ||
      !this.tipoPasajero ||
      !this.jornada ||
      !this.nombreUsuario ||
      !this.contrasena ||
      !this.repetirContrasena
    ) {
      console.error('Por favor complete todos los campos obligatorios.');
      this.mostrarToast('Por favor complete todos los campos obligatorios.'); // Muestra el Toast
      return;
    }

    // Verificar que las contraseñas coincidan
    if (this.contrasena !== this.repetirContrasena) {
      console.error('Las contraseñas no coinciden.');
      this.mostrarToast('Las contraseñas no coinciden.'); // Muestra el Toast
      return;
    }

    // Todos los campos están completados y las contraseñas coinciden, procede con la inserción del usuario
    const nuevoUsuario = {
      rut: this.numrut_usuario,
      nombre: this.nombre,
      apellidos: this.apellidos,
      fecnac: this.fechaNacimiento,
      tipo: this.tipoPasajero,
      jornada: this.jornada,
      email: this.nombreUsuario,
      contrasena: this.contrasena,
    };

    console.log('Nuevo Usuario:', nuevoUsuario);

    // Llama al servicio para insertar el nuevo usuario
    this.usuarioService.insertarUsuario(nuevoUsuario);
    this.mostrarToast('Usuario registrado con éxito.'); // Muestra el Toast de éxito
  }

  irAInicioSesion() {
    this.router.navigate(['/login']); // Redirige a la página de inicio de sesión
  }
}
