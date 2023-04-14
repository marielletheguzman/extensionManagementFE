import { TestBed } from '@angular/core/testing';

import { ExpiredPartnersServicesService } from './expired-partners-services.service';

describe('ExpiredPartnersServicesService', () => {
  let service: ExpiredPartnersServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpiredPartnersServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
