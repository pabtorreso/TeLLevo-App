import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BDUsuarioService {

  constructor() { }

  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  async insertarUsuario() {
    const { data, error } = await this.supabase
      .from('USUARIO')
      .upsert([
        {
          "id": 1,
          "numrut_usuario": 18980582,
          "dvrun_usuario": "9",
          "nombre_usuario": "ESTEBAN",
          "apellidos_usuario": "JARA GONZALEZ",
          "fecnac_usuario": "1995-02-07",
          "numtel_usuario": "984340662",
          "email_usuario": "estebin@live.cl",
          "id_tipo_usuario": null,
          "contrasena_usuario": "123456",
          "id_tipo_pasajero": null,
          "id_jornada": null
        },
      ]);

    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', data);
    }
  }


}
