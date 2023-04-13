import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExtensionPartnerComponent } from './add-extension-partner.component';

describe('AddExtensionPartnerComponent', () => {
  let component: AddExtensionPartnerComponent;
  let fixture: ComponentFixture<AddExtensionPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExtensionPartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddExtensionPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
