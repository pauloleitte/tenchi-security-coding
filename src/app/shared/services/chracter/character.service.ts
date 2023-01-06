import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponseList, Character } from 'src/app/core/interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  apiUrl = '';
  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllCharacters(page?: number) {
    return this.http.get<ApiResponseList<Character>>(
      `${this.apiUrl}/character?page=${page ?? ''}`
    );
  }

  getSingleCharacter(id: number) {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }
}
