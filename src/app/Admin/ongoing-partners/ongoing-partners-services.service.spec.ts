import { TestBed } from '@angular/core/testing';

import { OngoingPartnersServicesService } from './ongoing-partners-services.service';

describe('OngoingPartnersServicesService', () => {
  let service: OngoingPartnersServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OngoingPartnersServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
