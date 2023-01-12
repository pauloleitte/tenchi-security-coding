import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CharacterService } from '../../../../shared/services/character/character.service';
import { SharedModule } from '../../../../shared/shared.module';

import { ListComponent } from './list.component';

const characterServiceMock = {
  getAllCharacters: jest.fn(),
  getSingleCharacterByName: jest.fn(),
  getAllCharactersSub: of({
    info: {
      count: 826,
      pages: 42,
      next: 'https://rickandmortyapi.com/api/character/?page=2',
      prev: null,
    },
    results: [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/1',
          'https://rickandmortyapi.com/api/episode/2',
          // ...
        ],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z',
      },
    ],
  }),
  getSingleCharacterByNameSub: of({
    info: {
      count: 826,
      pages: 42,
      next: 'https://rickandmortyapi.com/api/character/?page=2',
      prev: null,
    },
    results: [
      {
        id: 1,
        name: 'Rick Sanchez',
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: {
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/location/1',
        },
        location: {
          name: 'Earth',
          url: 'https://rickandmortyapi.com/api/location/20',
        },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [
          'https://rickandmortyapi.com/api/episode/1',
          'https://rickandmortyapi.com/api/episode/2',
        ],
        url: 'https://rickandmortyapi.com/api/character/1',
        created: '2017-11-04T18:48:46.250Z',
      },
    ],
  }),
};

const router = {
  navigateByUrl: jest.fn(),
};

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: router },
        {
          provide: CharacterService,
          useValue: characterServiceMock,
        },
      ],
    }).compileComponents();

    characterServiceMock.getAllCharacters.mockReturnValue(
      characterServiceMock.getAllCharactersSub
    );

    characterServiceMock.getSingleCharacterByName.mockReturnValue(
      characterServiceMock.getSingleCharacterByNameSub
    );

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()', () => {
    const spyGetCharacters = jest.spyOn(component, 'getCharacters');
    component.ngOnInit();
    expect(spyGetCharacters).toBeCalled();
  });

  it('should be test onClickCard()', () => {
    component.onClickCard(1);
    expect(router.navigateByUrl).toBeCalledWith('character/1');
  });

  it('should be test onScroll()', () => {
    component.onScroll();
    expect(component.characters.length).toBeGreaterThanOrEqual(1);
  });

  it('should be test onSearchQueryInput()', () => {
    const eventMock = {
      target: {
        value: 'Teste',
      },
    } as unknown as Event;
    component.onSearchQueryInput(eventMock);
    expect(component.characters.length).toBeGreaterThanOrEqual(1);
  });
});
