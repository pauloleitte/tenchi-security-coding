import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LocationService } from './location.service';

describe('LocationService', () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(LocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be test getAllLocations', () => {
    const spy = jest.spyOn(service, 'getAllLocations');
    service.getAllLocations();
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
  });

  it('should be test getSingleLocation', () => {
    const spy = jest.spyOn(service, 'getSingleLocation');
    service.getSingleLocation(1);
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(1);
  });

  it('should be test getSingleLocationByName', () => {
    const spy = jest.spyOn(service, 'getSingleLocationByName');
    service.getSingleLocationByName('Earth');
    expect(spy).toBeCalled();
    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith('Earth');
  });
});
