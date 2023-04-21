import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishedListOfProgramsComponent } from './finished-list-of-programs.component';

describe('FinishedListOfProgramsComponent', () => {
  let component: FinishedListOfProgramsComponent;
  let fixture: ComponentFixture<FinishedListOfProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinishedListOfProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishedListOfProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
