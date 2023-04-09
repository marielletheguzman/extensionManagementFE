import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendinggAccountsComponent } from './pendingg-accounts.component';

describe('PendinggAccountsComponent', () => {
  let component: PendinggAccountsComponent;
  let fixture: ComponentFixture<PendinggAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendinggAccountsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PendinggAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
