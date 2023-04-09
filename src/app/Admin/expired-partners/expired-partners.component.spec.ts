import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredPartnersComponent } from './expired-partners.component';

describe('ExpiredPartnersComponent', () => {
  let component: ExpiredPartnersComponent;
  let fixture: ComponentFixture<ExpiredPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredPartnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
