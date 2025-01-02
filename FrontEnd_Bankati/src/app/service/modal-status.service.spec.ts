import { TestBed } from '@angular/core/testing';

import { ModalStatusService } from './modal-status.service';

describe('ModalStatusService', () => {
  let service: ModalStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
