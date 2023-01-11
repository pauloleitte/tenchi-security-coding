import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { ApiResponseList, Location } from '../../../core/interface';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  apiUrl = '';

  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllLocations(page?: number) {
    return this.http.get<ApiResponseList<Location>>(
      `${this.apiUrl}/location?page=${page ?? '1'}`
    );
  }

  getSingleLocation(id: number) {
    return this.http.get<Location>(`${this.apiUrl}/location/${id}`);
  }

  getSingleLocationByName(name: string) {
    return this.http.get<ApiResponseList<Location>>(
      `${this.apiUrl}/location/?name=${name}`
    );
  }
}
