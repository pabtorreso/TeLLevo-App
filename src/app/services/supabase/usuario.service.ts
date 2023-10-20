import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  private autenticado = false; // Variable para rastrear el estado de autenticación

  constructor() { }

  async insertarUsuario(usuario: any) {
    const { data, error } = await this.supabase
      .from('USER')
      .upsert([
        {
          rut: usuario.rut,
          nombre: usuario.nombre,
          apellidos: usuario.apellidos,
          fecnac: usuario.fecnac,
          tipo: usuario.tipo,
          jornada: usuario.jornada,
          email: usuario.email,
          contrasena: usuario.contrasena,
        },
      ]);

    if (error) {
      console.error('Error insertando datos:', error);
    } else {
      console.log('Datos insertados con exito:', data);
    }
  }

  async verificarCredenciales(email: string, contrasena: string): Promise<boolean> {
    // Consulta Supabase para verificar las credenciales
    const { data, error } = await this.supabase
      .from('USER')
      .select()
      .eq('email', email)
      .eq('contrasena', contrasena);

    if (error) {
      console.error('Error al verificar las credenciales:', error);
      return false;
    }

    // Comprueba si se encontró un usuario con las credenciales proporcionadas
    const usuarioValido = data && data.length > 0;

    // Establece el estado de autenticación según el resultado
    this.autenticado = usuarioValido;

    return usuarioValido;
  }

  // Método para establecer el estado de autenticación
  establecerAutenticacion(autenticado: boolean) {
    this.autenticado = autenticado;
  }

  // Método para obtener el estado de autenticación
  estaAutenticado(): boolean {
    return this.autenticado;
  }
}
