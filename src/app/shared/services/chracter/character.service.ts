import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  apiUrl = '';
  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllCharacters() {
    return this.http.get(`${this.apiUrl}/character`);
  }

  getSingleCharacter(id: number) {
    return this.http.get(`${this.apiUrl}/character/${id}`);
  }
}
