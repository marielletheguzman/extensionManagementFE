import { TestBed } from '@angular/core/testing';

import { UploadRelatedFilesService } from './upload-related-files.service';

describe('UploadRelatedFilesService', () => {
  let service: UploadRelatedFilesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadRelatedFilesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
