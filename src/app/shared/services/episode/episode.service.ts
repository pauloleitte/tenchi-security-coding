import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseList, Episode } from 'src/app/core/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class EpisodeService {
  apiUrl = '';
  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllEpisodes(page?: number) {
    return this.http.get<ApiResponseList<Episode>>(
      `${this.apiUrl}/episode?page=${page ?? '1'}`
    );
  }

  getSingleEpisode(id: number) {
    return this.http.get<Episode>(`${this.apiUrl}/episode/${id}`);
  }

  getSingleEpisodeByName(name: string) {
    return this.http.get<ApiResponseList<Episode>>(
      `${this.apiUrl}/episode/?name=${name}`
    );
  }
}
