import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { ApiResponseList, Location } from '../../../core/interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrl = '';

  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllLocations(page: number = 1): Observable<ApiResponseList<Location>> {
    return this.http.get<ApiResponseList<Location>>(
      `${this.apiUrl}/location?page=${page}`
    );
  }

  getSingleLocation(id: number): Observable<Location> {
    return this.http.get<Location>(`${this.apiUrl}/location/${id}`);
  }

  getLocationsByName(name: string): Observable<ApiResponseList<Location>> {
    return this.http.get<ApiResponseList<Location>>(
      `${this.apiUrl}/location/?name=${name}`
    );
  }
}
