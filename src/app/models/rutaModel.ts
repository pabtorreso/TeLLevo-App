import { Time } from "@angular/common";

export class viajePersonalModel {
    constructor(

      public id_ruta: Time,
      public fecha: string,
      public asientos_disponibles: number,
      public valor: number,
      public origen: string,
      public destino: string,
      public duracion: Time,
      public kilometros: number
    ) {}
}