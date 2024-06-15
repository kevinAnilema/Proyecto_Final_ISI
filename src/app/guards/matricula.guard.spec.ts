import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { matriculaGuard } from './matricula.guard';

describe('matriculaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => matriculaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
