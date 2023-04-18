import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSystemImgComponent } from './edit-system-img.component';

describe('EditSystemImgComponent', () => {
  let component: EditSystemImgComponent;
  let fixture: ComponentFixture<EditSystemImgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSystemImgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditSystemImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
