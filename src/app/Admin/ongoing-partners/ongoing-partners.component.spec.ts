import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingPartnersComponent } from './ongoing-partners.component';

describe('OngoingPartnersComponent', () => {
  let component: OngoingPartnersComponent;
  let fixture: ComponentFixture<OngoingPartnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OngoingPartnersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OngoingPartnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
