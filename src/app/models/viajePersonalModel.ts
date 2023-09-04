import { Time } from "@angular/common";

export class viajePersonalModel {
    constructor(
      public duracion: Time,
      public destino: string,
      public kilometros: number,
      public puntuacion: number,
      public id_estado: string,
      public id_ruta: string,
      public username: string,
      public id_tipo_pago: number

    ) {}
}