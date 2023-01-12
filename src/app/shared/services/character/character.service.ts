import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { ApiResponseList, Character } from '../../../core/interface';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = '';
  constructor(private readonly http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getAllCharacters(page: number = 1): Observable<ApiResponseList<Character>> {
    return this.http.get<ApiResponseList<Character>>(
      `${this.apiUrl}/character?page=${page}`
    );
  }

  getSingleCharacter(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/character/${id}`);
  }

  getCharactersByName(name: string): Observable<ApiResponseList<Character>> {
    return this.http.get<ApiResponseList<Character>>(
      `${this.apiUrl}/character/?name=${name}`
    );
  }
}
