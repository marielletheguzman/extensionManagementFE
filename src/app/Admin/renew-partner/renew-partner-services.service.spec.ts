import { TestBed } from '@angular/core/testing';

import { RenewPartnerServicesService } from './renew-partner-services.service';

describe('RenewPartnerServicesService', () => {
  let service: RenewPartnerServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenewPartnerServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
