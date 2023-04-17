import { TestBed } from '@angular/core/testing';

import { EditWebsiteServicesService } from './edit-website-services.service';

describe('EditWebsiteServicesService', () => {
  let service: EditWebsiteServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditWebsiteServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
