import { Injectable } from '@angular/core';
import { UserModel } from "app/models/UserModel";
import { TripsModel } from 'app/models/TripsModel';
import { PassengersModel } from 'app/models/PassengersModel';
import { TripDetailModel } from 'app/models/TripDetailModel';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map } from "rxjs";
import { Router, RouterLinkWithHref, } from '@angular/router';
import { Preferences } from '@capacitor/preferences';

@Injectable({ providedIn: 'root' })
export class TripsService {
  URL_SUPABASE = 'https://frrwaoacgpogsszqpyxc.supabase.co/rest/v1/'

  constructor(private _httpclient: HttpClient, private router: Router) { }

  supabaseheaders = new HttpHeaders()
      .set('apikey', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZycndhb2FjZ3BvZ3NzenFweXhjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTcyODIzMTYsImV4cCI6MjAxMjg1ODMxNn0.nuP5eBF5vJFZfIS6e_rD7PVNuFiSREDD2vgqnYyKZ8U')

  getTrips(): Observable<TripsModel[]> {
    return this._httpclient.get<TripsModel[]>(`${this.URL_SUPABASE}/TRIPS`);
  }

  createTrip(trip: Partial<TripsModel>): Observable<any> {
    return this._httpclient.post<Partial<TripsModel>>(this.URL_SUPABASE + 'TRIPS', trip, { headers: this.supabaseheaders });
  }

  getTripsByUserId(userId: string): Observable<TripsModel[]> {
    return this._httpclient.get<TripsModel[]>(`${this.URL_SUPABASE}/TRIPS?driver_id=eq.${userId}`, { headers: this.supabaseheaders });
  }
  
  getTripById(trip_id: string): Observable<TripsModel> {
    return this._httpclient.get<TripsModel>(`${this.URL_SUPABASE}/TRIPS?trip_id=eq.${trip_id}`, { headers: this.supabaseheaders });
  }

  getTripDetails(trip_id: string): Observable<TripDetailModel> {
    return this._httpclient.get<TripDetailModel[]>(
      `${this.URL_SUPABASE}/TRIPS?trip_id=eq.${trip_id}&select=*,driver_id:USERS(*,first_name,last_name)`,
      { headers: this.supabaseheaders }
    ).pipe(map(response => response[0])); // Toma el primer objeto del arreglo
  }

  getAllTripDetails(): Observable<TripDetailModel[]> {
    return this._httpclient.get<TripDetailModel[]>(
      `${this.URL_SUPABASE}/TRIPS?select=*,driver_id:USERS(*,first_name,last_name)`,
      { headers: this.supabaseheaders }
    );
  }

  getPassengersForTrip(trip_id: string): Observable<UserModel[]> {
    return this._httpclient.get<{passenger_id: UserModel}[]>(
      `${this.URL_SUPABASE}/PASSENGERS?trip_id=eq.${trip_id}&select=passenger_id:USERS(first_name,last_name,user_id)!inner`,
      { headers: this.supabaseheaders }
    ).pipe(
      map(response => response.map(res => res.passenger_id))
    );
  }

  updateTrip(trip: Partial<TripDetailModel>): Observable<Partial<TripDetailModel>> {
    return this._httpclient.put<Partial<TripDetailModel>>(`${this.URL_SUPABASE}/TRIPS?trip_id=eq.${trip.trip_id}`, trip, { headers: this.supabaseheaders });
  }

  addPassenger(passenger: PassengersModel): Observable<PassengersModel> {
    return this._httpclient.post<PassengersModel>(`${this.URL_SUPABASE}/PASSENGERS`, passenger, { headers: this.supabaseheaders })
      .pipe(
        catchError((error: any) => {
          console.error('Error al agregar pasajero:', error);
          throw error;
        })
      );
  }

  getPassengersForUser(userId: string): Observable<PassengersModel[]> {
    return this._httpclient.get<PassengersModel[]>(
      `${this.URL_SUPABASE}/PASSENGERS?passenger_id=eq.${userId}`,
      { headers: this.supabaseheaders }
    );
  }

  removePassenger(tripId: string, userId: string): Observable<any> {
    return this._httpclient.delete(`${this.URL_SUPABASE}/PASSENGERS?trip_id=eq.${tripId}&passenger_id=eq.${userId}`, { headers: this.supabaseheaders });
  }

  deleteTrip(trip_id: string): Observable<void> {
    return this._httpclient.delete<void>(`${this.URL_SUPABASE}/TRIPS?trip_id=eq.${trip_id}`, { headers: this.supabaseheaders });
  }

}
