import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProgramMembersComponent } from './list-program-members.component';

describe('ListProgramMembersComponent', () => {
  let component: ListProgramMembersComponent;
  let fixture: ComponentFixture<ListProgramMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProgramMembersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProgramMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
