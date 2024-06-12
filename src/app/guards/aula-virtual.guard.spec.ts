import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { aulaVirtualGuard } from './aula-virtual.guard';

describe('aulaVirtualGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => aulaVirtualGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
