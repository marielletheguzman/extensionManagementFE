import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageExtensionComponent } from './manage-extension.component';

describe('ManageExtensionComponent', () => {
  let component: ManageExtensionComponent;
  let fixture: ComponentFixture<ManageExtensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageExtensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageExtensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
