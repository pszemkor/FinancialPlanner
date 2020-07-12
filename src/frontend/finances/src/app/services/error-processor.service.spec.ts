import { TestBed } from '@angular/core/testing';

import { ErrorProcessorService } from './error-processor.service';

describe('ErrorProcessorService', () => {
  let service: ErrorProcessorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorProcessorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
