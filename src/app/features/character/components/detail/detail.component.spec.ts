import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { CharacterService } from '../../../../shared/services/character/character.service';
import { EpisodeService } from '../../../../shared/services/episode/episode.service';
import { SharedModule } from '../../../../shared/shared.module';

import { DetailComponent } from './detail.component';

const characterServiceMock = {
  getSingleCharacter: jest.fn(),
  getSingleCharacterSub: of({
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
  }),
};

const episodeServiceMock = {
  getSingleEpisode: jest.fn(),
  getSingleEpisodeSub: of({
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

const router = {
  navigateByUrl: jest.fn(),
};

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [
        SharedModule,
        RouterTestingModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      providers: [
        { provide: Router, useValue: router },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: 1 } },
          },
        },
        {
          provide: CharacterService,
          useValue: characterServiceMock,
        },
        {
          provide: EpisodeService,
          useValue: episodeServiceMock,
        },
      ],
    }).compileComponents();
    characterServiceMock.getSingleCharacter.mockReturnValue(
      characterServiceMock.getSingleCharacterSub
    );
    episodeServiceMock.getSingleEpisode.mockReturnValue(
      episodeServiceMock.getSingleEpisodeSub
    );
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()', () => {
    const spyGetCharacter = jest.spyOn(component, 'getCharacter');
    const spyGetEpisodes = jest.spyOn(component, 'getEpisodes');
    component.ngOnInit();
    expect(spyGetCharacter).toBeCalled();
    expect(spyGetEpisodes).toBeCalled();
    expect(component.loading).toBeFalsy();
  });

  it('should be test onEpisodeClick()', () => {
    component.onEpisodeClick(1);
    expect(router.navigateByUrl).toBeCalledWith('episode/1');
  });
});
