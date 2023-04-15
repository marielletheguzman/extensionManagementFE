import { TestBed } from '@angular/core/testing';

import { ViewSpecificPartnerServicesService } from './view-specific-partner-services.service';

describe('ViewSpecificPartnerServicesService', () => {
  let service: ViewSpecificPartnerServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSpecificPartnerServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
