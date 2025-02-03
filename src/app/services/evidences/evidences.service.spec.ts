import { TestBed } from '@angular/core/testing';

import { EvidencesService } from './evidences.service';

describe('EvidencesService', () => {
  let service: EvidencesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidencesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
