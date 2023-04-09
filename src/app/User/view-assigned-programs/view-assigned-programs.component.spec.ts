import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedProgramsComponent } from './view-assigned-programs.component';

describe('ViewAssignedProgramsComponent', () => {
  let component: ViewAssignedProgramsComponent;
  let fixture: ComponentFixture<ViewAssignedProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAssignedProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssignedProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
