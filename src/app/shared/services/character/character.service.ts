import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  getAllCharacters(page?: number) {
    return this.http.get<ApiResponseList<Character>>(
      `${this.apiUrl}/character?page=${page ?? '1'}`
    );
  }

  getSingleCharacter(id: number) {
    return this.http.get<Character>(`${this.apiUrl}/character/${id}`);
  }

  getSingleCharacterByName(name: string) {
    return this.http.get<ApiResponseList<Character>>(
      `${this.apiUrl}/character/?name=${name}`
    );
  }
}
