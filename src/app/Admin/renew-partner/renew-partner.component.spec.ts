import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewPartnerComponent } from './renew-partner.component';

describe('RenewPartnerComponent', () => {
  let component: RenewPartnerComponent;
  let fixture: ComponentFixture<RenewPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RenewPartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenewPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
