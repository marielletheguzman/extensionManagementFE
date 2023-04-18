import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSystemLogoComponent } from './edit-system-logo.component';

describe('EditSystemLogoComponent', () => {
  let component: EditSystemLogoComponent;
  let fixture: ComponentFixture<EditSystemLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSystemLogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSystemLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
