import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadingProgramComponent } from './leading-program.component';

describe('LeadingProgramComponent', () => {
  let component: LeadingProgramComponent;
  let fixture: ComponentFixture<LeadingProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadingProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeadingProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
