import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserImgComponent } from './edit-user-img.component';

describe('EditUserImgComponent', () => {
  let component: EditUserImgComponent;
  let fixture: ComponentFixture<EditUserImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUserImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditUserImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
