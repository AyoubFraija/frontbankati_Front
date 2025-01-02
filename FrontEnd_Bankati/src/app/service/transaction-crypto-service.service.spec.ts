import { TestBed } from '@angular/core/testing';

import { TransactionCryptoServiceService } from './transaction-crypto-service.service';

describe('TransactionCryptoServiceService', () => {
  let service: TransactionCryptoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionCryptoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
