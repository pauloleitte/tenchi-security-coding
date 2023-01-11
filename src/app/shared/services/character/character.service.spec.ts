import { TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule
} from '@angular/common/http/testing';
import { CharacterService } from './character.service';

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(CharacterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be test getAllCharacters', () => {
    const spy = jest.spyOn(service, 'getAllCharacters');
    service.getAllCharacters();
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
  });

  it('should be test getSingleCharacter', () => {
    const spy = jest.spyOn(service, 'getSingleCharacter');
    service.getSingleCharacter(1);
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(1);
  });

  it('should be test getSingleCharacterByName', () => {
    const spy = jest.spyOn(service, 'getSingleCharacterByName');
    service.getSingleCharacterByName('Rick');
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('Rick');
  });
});
