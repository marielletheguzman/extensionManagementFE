import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProgramsUploadComponent } from './list-programs-upload.component';

describe('ListProgramsUploadComponent', () => {
  let component: ListProgramsUploadComponent;
  let fixture: ComponentFixture<ListProgramsUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListProgramsUploadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListProgramsUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
