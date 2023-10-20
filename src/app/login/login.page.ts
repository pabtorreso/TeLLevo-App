import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { createClient } from '@supabase/supabase-js';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  supabase = createClient(environment.supabaseUrl, environment.supabaseKey);

  async insertarUsuario() {
    const { data, error } = await this.supabase
      .from('USUARIO')
      .upsert([
        {
          "numrut_usuario": 18980583,
          "dvrun_usuario": "9",
          "nombre_usuario": "ESTEBAN",
          "apellidos_usuario": "JARA GONZALEZ",
          "fecnac_usuario": "1995-02-07",
          "numtel_usuario": "984342",
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


