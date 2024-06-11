import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
    :host ::ng-deep .pi-eye,
    :host ::ng-deep .pi-eye-slash {
      transform: scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `],
  providers: [MessageService]
})
export class LoginComponent {
  rememberMe: boolean = false;
  dato: boolean=false;
  password: string = '';
  email: string = '';
  idUsuario = 0;
  mensaje='';  

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private usuarioService: UsuarioService,
    private service: MessageService   
  ) { }

  mostrarError(mensaje:string) {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Mensaje de error', detail: mensaje });
  }

  mostrarAlerta(mensaje:string) {
    this.service.add({ key: 'tst', severity: 'warn', summary: 'Aviso', detail: mensaje });
  }

  login() {
    if (!this.email || !this.password) {
      const mensaje = 'Ingrese las credenciales';
      this.mostrarError(mensaje);
    } else {
      this.usuarioService.getUsuario(this.email, this.password).subscribe(
        user => {
          if (user) {
            console.log('Datos del usuario:', user);
            const idUsuario = user.idUsuario;
            console.log('ID del usuario:', idUsuario);
            // Verifico si este usuario tiene la matrícula activa
            this.usuarioService.getMatriculaActiva(idUsuario).subscribe(
              usuarioActivo => {
                if (usuarioActivo && usuarioActivo.length > 0 && usuarioActivo[0].activo) {
                  console.log('Datos del usuario activo:', usuarioActivo);
                  // Llamada a setSession
                  if(this.rememberMe){                  
                  this.usuarioService.setSession(true);
                  this.dato = this.usuarioService.isLoggedIn()
                  console.log("Valor asignado a localStorage:",this.dato);
                  }
                  this.router.navigate(['/app/']);
                } else {
                  console.log('Usuario inactivo');
                  const mensaje = 'Este usuario no está activo. Verifique su estado de matrícula';
                  this.mostrarAlerta(mensaje);
                }
              },
              error => {
                console.error('Error al verificar la matrícula:', error);
                const mensaje = 'Error al verificar la matrícula. Por favor, inténtelo de nuevo más tarde.';
                this.mostrarError(mensaje);
              }
            );
          } else {
            const mensaje = 'Datos incorrectos / Usuario no registrado';
            this.mostrarError(mensaje);
          }
        },
        error => {
          console.error('Error al cargar datos:', error);
          const mensaje = 'Error al cargar datos. Por favor, inténtelo de nuevo más tarde.';
          this.mostrarError(mensaje);
        }
      );
    }
  }
}
