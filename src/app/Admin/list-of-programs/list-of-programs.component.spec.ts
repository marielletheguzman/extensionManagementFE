import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfProgramsComponent } from './list-of-programs.component';

describe('ListOfProgramsComponent', () => {
  let component: ListOfProgramsComponent;
  let fixture: ComponentFixture<ListOfProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOfProgramsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOfProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
