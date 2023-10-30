import { Type } from "@angular/core"
import { UserModel } from "./UserModel"

export interface TripDetailModel {
    trip_id: string;
    origin: string;
    destination: string;
    availableSeats: number;
    driver_id: UserModel; // El usuario conductor
    passengers?: UserModel[]; // Lista de usuarios pasajeros
  }
  