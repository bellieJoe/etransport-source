import { TestBed } from '@angular/core/testing';

import { VerifiedAdministratorGuard } from './verified-administrator.guard';

describe('VerifiedAdministratorGuard', () => {
  let guard: VerifiedAdministratorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifiedAdministratorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
