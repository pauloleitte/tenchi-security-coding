import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  apiUrl = '';

  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllLocations() {
    return this.http.get(`${this.apiUrl}/location`);
  }

  getSingleLocation(id: number) {
    return this.http.get(`${this.apiUrl}/location/${id}`);
  }
}
