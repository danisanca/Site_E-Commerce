import { TestBed } from '@angular/core/testing';

import { HistorypurchaseService } from './historypurchase.service';

describe('HistorypurchaseService', () => {
  let service: HistorypurchaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorypurchaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
