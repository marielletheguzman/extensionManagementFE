import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdminSpecificProgramComponent } from './view-admin-specific-program.component';

describe('ViewAdminSpecificProgramComponent', () => {
  let component: ViewAdminSpecificProgramComponent;
  let fixture: ComponentFixture<ViewAdminSpecificProgramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAdminSpecificProgramComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAdminSpecificProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
