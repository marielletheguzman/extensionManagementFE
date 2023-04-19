import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProgramMemberComponent } from './add-program-member.component';

describe('AddProgramMemberComponent', () => {
  let component: AddProgramMemberComponent;
  let fixture: ComponentFixture<AddProgramMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddProgramMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddProgramMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
