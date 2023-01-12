import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { LocationService } from './../../../../shared/services/location/location.service';

import { ListComponent } from './list.component';

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
          provide: LocationService,
          useValue: locationServiceMock,
        },
      ],
    }).compileComponents();

    locationServiceMock.getAllLocations.mockReturnValue(
      locationServiceMock.getAllLocationsSub
    );

    locationServiceMock.getAllLocationsByName.mockReturnValue(
      locationServiceMock.getAllLocationsByNameSub
    );

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()', () => {
    const spyGetCharacters = jest.spyOn(component, 'getLocations');
    component.ngOnInit();
    expect(spyGetCharacters).toBeCalled();
  });

  it('should be test onEpisodeClick()', () => {
    component.onClickCard(1);
    expect(router.navigateByUrl).toBeCalledWith('location/1');
  });

  it('should be test onScroll()', () => {
    component.onScroll();
    expect(component.locations.length).toBeGreaterThanOrEqual(1);
  });

  it('should be test onSearchQueryInput()', () => {
    const eventMock = {
      target: {
        value: 'Teste',
      },
    } as unknown as Event;
    component.onSearchQueryInput(eventMock);
    expect(component.locations.length).toBeGreaterThanOrEqual(1);
  });
});
