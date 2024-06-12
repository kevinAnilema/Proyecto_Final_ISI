import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class AulaVirtualGuard implements CanActivate {
  constructor(
    private authService: UsuarioService, 
    private router: Router,
    private notificationService: NotificationService  
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isActive()) { // Verifica si la matrícula está activa
      return true;
    } else {
      console.log('Sin matricula activa');
      return false;
    }
  }
}
