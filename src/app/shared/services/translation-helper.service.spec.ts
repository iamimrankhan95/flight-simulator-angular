import { TestBed } from '@angular/core/testing';

import { TranslationHelperService } from './translation-helper.service';
import { TranslateService } from '@ngx-translate/core';

describe('TranslationHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    // providers: [TranslateService]
  }));

  it('should be created', () => {
    const service: TranslationHelperService = TestBed.get(TranslationHelperService);
    expect(service).toBeTruthy();
  });
});
