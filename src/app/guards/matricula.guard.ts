import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class MatriculaGuard implements CanActivate {
  constructor(
    private userService: UserService, 
    private router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userService.getpermisoMatricula()){
      return true;
    } else {
      console.log('Sin permisos para generar matrícula');
      this.router.navigate(['']);
      return false;
    }
  }
}
