import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { EpisodeService } from './../../../../shared/services/episode/episode.service';

import { ListComponent } from './list.component';

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
          provide: EpisodeService,
          useValue: episodeServiceMock,
        },
      ],
    }).compileComponents();

    episodeServiceMock.getAllEpisodes.mockReturnValue(
      episodeServiceMock.getAllEpisodesSub
    );

    episodeServiceMock.getSingleEpisodeByName.mockReturnValue(
      episodeServiceMock.getSingleEpisodeByNameSub
    );

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()', () => {
    const spyGetCharacters = jest.spyOn(component, 'getEpisodes');
    component.ngOnInit();
    expect(spyGetCharacters).toBeCalled();
  });

  it('should be test onEpisodeClick()', () => {
    component.onClickCard(1);
    expect(router.navigateByUrl).toBeCalledWith('episode/1');
  });

  it('should be test onScroll()', () => {
    component.onScroll();
    expect(component.episodes.length).toBeGreaterThanOrEqual(1);
  });

  it('should be test onSearchQueryInput()', () => {
    const eventMock = {
      target: {
        value: 'Teste',
      },
    } as unknown as Event;
    component.onSearchQueryInput(eventMock);
    expect(component.episodes.length).toBeGreaterThanOrEqual(1);
  });
});
