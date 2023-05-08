import { TestBed } from '@angular/core/testing';

import { LeadingService } from './leading.service';

describe('LeadingService', () => {
  let service: LeadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
