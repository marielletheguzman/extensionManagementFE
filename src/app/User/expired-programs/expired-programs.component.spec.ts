import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredProgramsComponent } from './expired-programs.component';

describe('ExpiredProgramsComponent', () => {
  let component: ExpiredProgramsComponent;
  let fixture: ComponentFixture<ExpiredProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
