import { TestBed } from '@angular/core/testing';

import { PendingAccountService } from './pending-account.service';

describe('PendingAccountService', () => {
  let service: PendingAccountService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PendingAccountService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
