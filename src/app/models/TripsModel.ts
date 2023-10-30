import { Type } from "@angular/core"
import { UserModel } from "./UserModel"

export interface TripsModel {
    trip_id: string;
    origin: string;
    destination: string;
    availableSeats: number;
    driver_id: string;
}