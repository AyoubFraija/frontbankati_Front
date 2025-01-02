import { TestBed } from '@angular/core/testing';

import { CryptoWalletServiceService } from './crypto-wallet-service.service';

describe('CryptoWalletServiceService', () => {
  let service: CryptoWalletServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoWalletServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
