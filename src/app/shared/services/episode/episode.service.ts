import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Episode } from 'src/app/core/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  apiUrl = '';
  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllEpisodes() {
    return this.http.get(`${this.apiUrl}/episode`);
  }

  getSingleEpisode(id: number) {
    return this.http.get<Episode>(`${this.apiUrl}/episode/${id}`);
  }
}
