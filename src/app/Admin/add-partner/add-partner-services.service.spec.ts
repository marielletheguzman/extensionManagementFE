import { TestBed } from '@angular/core/testing';

import { AddPartnerServicesService } from './add-partner-services.service';

describe('AddPartnerServicesService', () => {
  let service: AddPartnerServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPartnerServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
