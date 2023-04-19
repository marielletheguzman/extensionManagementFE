import { TestBed } from '@angular/core/testing';

import { AdminEditProfileService } from './admin-edit-profile.service';

describe('AdminEditProfileService', () => {
  let service: AdminEditProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminEditProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
