import { TestBed } from '@angular/core/testing';

import { ToasterHelperService } from './toaster-helper.service';
import { ToasterService } from 'angular2-toaster/angular2-toaster';

describe('ToasterHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ToasterService]
  }));

  it('should be created', () => {
    const service: ToasterHelperService = TestBed.get(ToasterHelperService);
    expect(service).toBeTruthy();
  });
});
