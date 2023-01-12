import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { ApiResponseList, Episode } from '../../../core/interface';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  private apiUrl = '';

  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllEpisodes(page: number = 1): Observable<ApiResponseList<Episode>> {
    return this.http.get<ApiResponseList<Episode>>(
      `${this.apiUrl}/episode?page=${page}`
    );
  }

  getSingleEpisode(id: number): Observable<Episode> {
    return this.http.get<Episode>(`${this.apiUrl}/episode/${id}`);
  }

  getEpisodesByName(name: string): Observable<ApiResponseList<Episode>> {
    return this.http.get<ApiResponseList<Episode>>(
      `${this.apiUrl}/episode/?name=${name}`
    );
  }
}
