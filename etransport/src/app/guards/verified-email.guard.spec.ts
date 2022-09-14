import { TestBed } from '@angular/core/testing';

import { VerifiedEmailGuard } from './verified-email.guard';

describe('VerifiedEmailGuard', () => {
  let guard: VerifiedEmailGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifiedEmailGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
