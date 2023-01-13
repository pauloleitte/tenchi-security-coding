import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CharacterService } from './../../../../shared/services/character/character.service';
import { EpisodeService } from './../../../../shared/services/episode/episode.service';
import { LocationService } from './../../../../shared/services/location/location.service';
import { SharedModule } from './../../../../shared/shared.module';
import { DashboardComponent } from './dashboard.component';

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

const episodeServiceMock = {
  getAllEpisodes: jest.fn(),
  getSingleEpisodeByName: jest.fn(),
  getAllEpisodesSub: of({
    info: {
      count: 51,
      pages: 3,
      next: 'https://rickandmortyapi.com/api/episode?page=2',
      prev: null,
    },
    results: [
      {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: [
          'https://rickandmortyapi.com/api/character/1',
          'https://rickandmortyapi.com/api/character/2',
          //...
        ],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z',
      },
      // ...
    ],
  }),
  getSingleEpisodeByNameSub: of({
    info: {
      count: 51,
      pages: 3,
      next: 'https://rickandmortyapi.com/api/episode?page=2',
      prev: null,
    },
    results: [
      {
        id: 1,
        name: 'Pilot',
        air_date: 'December 2, 2013',
        episode: 'S01E01',
        characters: [
          'https://rickandmortyapi.com/api/character/1',
          'https://rickandmortyapi.com/api/character/2',
          //...
        ],
        url: 'https://rickandmortyapi.com/api/episode/1',
        created: '2017-11-10T12:56:33.798Z',
      },
      // ...
    ],
  }),
};

const locationServiceMock = {
  getAllLocations: jest.fn(),
  getAllLocationsByName: jest.fn(),
  getAllLocationsSub: of({
    info: {
      count: 126,
      pages: 7,
      next: 'https://rickandmortyapi.com/api/location?page=2',
      prev: null,
    },
    results: [
      {
        id: 1,
        name: 'Earth',
        type: 'Planet',
        dimension: 'Dimension C-137',
        residents: [
          'https://rickandmortyapi.com/api/character/1',
          'https://rickandmortyapi.com/api/character/2',
          // ...
        ],
        url: 'https://rickandmortyapi.com/api/location/1',
        created: '2017-11-10T12:42:04.162Z',
      },
      // ...
    ],
  }),
  getAllLocationsByNameSub: of({
    info: {
      count: 126,
      pages: 7,
      next: 'https://rickandmortyapi.com/api/location?page=2',
      prev: null,
    },
    results: [
      {
        id: 1,
        name: 'Earth',
        type: 'Planet',
        dimension: 'Dimension C-137',
        residents: [
          'https://rickandmortyapi.com/api/character/1',
          'https://rickandmortyapi.com/api/character/2',
          // ...
        ],
        url: 'https://rickandmortyapi.com/api/location/1',
        created: '2017-11-10T12:42:04.162Z',
      },
      // ...
    ],
  }),
};

const router = {
  navigateByUrl: jest.fn(),
};

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
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
        {
          provide: LocationService,
          useValue: locationServiceMock,
        },
        {
          provide: EpisodeService,
          useValue: episodeServiceMock,
        },
      ],
    }).compileComponents();

    characterServiceMock.getAllCharacters.mockReturnValue(
      characterServiceMock.getAllCharactersSub
    );
    locationServiceMock.getAllLocations.mockReturnValue(
      locationServiceMock.getAllLocationsSub
    );
    episodeServiceMock.getAllEpisodes.mockReturnValue(
      episodeServiceMock.getAllEpisodesSub
    );
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
