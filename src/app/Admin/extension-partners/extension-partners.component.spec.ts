import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionPartnersComponent } from './extension-partners.component';

describe('ExtensionPartnersComponent', () => {
  let component: ExtensionPartnersComponent;
  let fixture: ComponentFixture<ExtensionPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtensionPartnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtensionPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
