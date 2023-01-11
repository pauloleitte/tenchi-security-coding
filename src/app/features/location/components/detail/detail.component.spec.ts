import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import { CharacterService } from './../../../../shared/services/character/character.service';
import { LocationService } from './../../../../shared/services/location/location.service';

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

const locationServiceMock = {
  getSingleLocation: jest.fn(),
  getSingleLocationSub: of({
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
          provide: LocationService,
          useValue: locationServiceMock,
        },
      ],
    }).compileComponents();
    characterServiceMock.getSingleCharacter.mockReturnValue(
      characterServiceMock.getSingleCharacterSub
    );
    locationServiceMock.getSingleLocation.mockReturnValue(
      locationServiceMock.getSingleLocationSub
    );
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test ngOnInit()', () => {
    const spyGetCharacters = jest.spyOn(component, 'getCharacters');
    const spyGetLocation = jest.spyOn(component, 'getLocation');
    component.ngOnInit();
    expect(spyGetCharacters).toBeCalled();
    expect(spyGetLocation).toBeCalled();
    expect(component.loading).toBeFalsy();
  });

  it('should be test onEpisodeClick()', () => {
    component.onCharacterClick(1);
    expect(router.navigateByUrl).toBeCalledWith('/character/1');
  });
});
