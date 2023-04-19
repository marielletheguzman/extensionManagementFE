import { TestBed } from '@angular/core/testing';

import { AddProgramMemberService } from './add-program-member.service';

describe('AddProgramMemberService', () => {
  let service: AddProgramMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddProgramMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
