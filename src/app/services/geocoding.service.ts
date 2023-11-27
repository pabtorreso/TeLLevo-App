import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
/// <reference types="@types/googlemaps" />


@Injectable({ providedIn: 'root' })
export class GeocodingService {
  private geocoder = new google.maps.Geocoder();
  private directionsService = new google.maps.DirectionsService();

  constructor(private http: HttpClient) {}

  geocodeAddress(address: string): Observable<google.maps.LatLngLiteral> {
    return new Observable(observer => {
      this.geocoder.geocode({ 'address': address }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results) {
          const location = results[0].geometry.location;
          observer.next({
            lat: location.lat(),
            lng: location.lng()
          });
          observer.complete();
        } else {
          observer.error('Geocoder failed due to: ' + status);
        }
      });
    });
  }

  getRoute(origin: string, destination: string): Observable<google.maps.DirectionsResult> {
    const request: google.maps.DirectionsRequest = {
      origin: origin,
      destination: destination,
      travelMode: google.maps.TravelMode.DRIVING
    };

    return new Observable(observer => {
      this.directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          observer.next(result);
          observer.complete();
        } else {
          observer.error('Directions request failed due to ' + status);
        }
      });
    });
  }
}
