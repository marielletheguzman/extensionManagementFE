import { TestBed } from '@angular/core/testing';

import { EditSystemService } from './edit-system.service';

describe('EditSystemService', () => {
  let service: EditSystemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditSystemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
