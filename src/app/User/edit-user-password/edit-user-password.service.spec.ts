import { TestBed } from '@angular/core/testing';

import { EditUserPasswordService } from './edit-user-password.service';

describe('EditUserPasswordService', () => {
  let service: EditUserPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserPasswordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
