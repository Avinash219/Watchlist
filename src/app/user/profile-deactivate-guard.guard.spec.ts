import { TestBed } from '@angular/core/testing';

import { ProfileDeactivateGuardGuard } from './profile-deactivate-guard.guard';

describe('ProfileDeactivateGuardGuard', () => {
  let guard: ProfileDeactivateGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProfileDeactivateGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
