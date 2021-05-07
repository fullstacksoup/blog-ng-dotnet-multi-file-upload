import { TestBed } from '@angular/core/testing';

import { ImageFileService } from './image-file.service';

describe('ImageFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageFileService = TestBed.get(ImageFileService);
    expect(service).toBeTruthy();
  });
});
