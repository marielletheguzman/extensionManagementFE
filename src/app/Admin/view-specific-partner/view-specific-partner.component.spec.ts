import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificPartnerComponent } from './view-specific-partner.component';

describe('ViewSpecificPartnerComponent', () => {
  let component: ViewSpecificPartnerComponent;
  let fixture: ComponentFixture<ViewSpecificPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecificPartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewSpecificPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
