import { TestBed } from '@angular/core/testing';

import { MessageContactService } from './message-contact.service';

describe('MessageContactService', () => {
  let service: MessageContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
