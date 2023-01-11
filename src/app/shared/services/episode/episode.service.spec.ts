import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EpisodeService } from './episode.service';

describe('EpisodeService', () => {
  let service: EpisodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(EpisodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be test getAllEpisodes', () => {
    const spy = jest.spyOn(service, 'getAllEpisodes');
    service.getAllEpisodes();
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
  });

  it('should be test getSingleEpisode', () => {
    const spy = jest.spyOn(service, 'getSingleEpisode');
    service.getSingleEpisode(1);
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(1);
  });

  it('should be test getSingleEpisodeByName', () => {
    const spy = jest.spyOn(service, 'getSingleEpisodeByName');
    service.getSingleEpisodeByName('Pilot');
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('Pilot');
  });
});
