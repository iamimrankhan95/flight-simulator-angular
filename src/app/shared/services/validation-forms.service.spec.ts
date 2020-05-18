import { TestBed } from '@angular/core/testing';

import { ValidationFormsService } from './validation-forms.service';

describe('ValidationFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidationFormsService = TestBed.get(ValidationFormsService);
    expect(service).toBeTruthy();
  });
});
