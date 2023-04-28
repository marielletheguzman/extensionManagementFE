import { TestBed } from '@angular/core/testing';

import { ExpiredProgramsService } from './expired-programs.service';

describe('ExpiredProgramsService', () => {
  let service: ExpiredProgramsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpiredProgramsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
