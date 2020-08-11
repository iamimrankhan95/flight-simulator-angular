import { TestBed } from '@angular/core/testing';

import { FlightSimulatorHttpService } from './flight-simulator-http.service';

describe('FlightSimulatorHttpService', () => {
  let service: FlightSimulatorHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlightSimulatorHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
