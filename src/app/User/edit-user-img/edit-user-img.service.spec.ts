import { TestBed } from '@angular/core/testing';

import { EditUserImgService } from './edit-user-img.service';

describe('EditUserImgService', () => {
  let service: EditUserImgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditUserImgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
