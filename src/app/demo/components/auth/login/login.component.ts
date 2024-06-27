import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

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
  dato: boolean = false;
  password: string = '';
  email: string = '';
  idUsuario = 0;
  mensaje = '';
  mostrarMatricularse: boolean = false; // propiedasdes para ocultar y mostrar botones
  ocultarBotonInicarSesion:boolean=true;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private usuarioService: UsuarioService,
    private service: MessageService,
    private userService: UserService
  ) { }

  mostrarError(mensaje: string) {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Mensaje de error', detail: mensaje });
  }

  mostrarAlerta(mensaje: string) {
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
                  if (this.rememberMe) {                  
                    this.usuarioService.setSession(true);                    
                    this.usuarioService.setEstado(true);
                    this.userService.setDatosUser(usuarioActivo); // Guardo los datos del usuario
                    console.log('Datos guardados con membresia activa:',usuarioActivo);
                    this.dato = this.usuarioService.isLoggedIn();
                    console.log("Valor asignado a localStorage:", this.dato);
                    this.router.navigate(['/app/']);
                  }
                  else{                                      
                    this.usuarioService.setSession(true);
                    this.usuarioService.setEstado(true);
                    this.dato = this.usuarioService.isLoggedIn();
                    this.userService.setDatosUser(usuarioActivo);
                    this.router.navigate(['/app/']);
                  }
                  
                } else {                                   
                  const mensaje = 'Este usuario no está activo. Puede matricularse ahora';
                  this.mostrarAlerta(mensaje);
                  this.userService.setUser(user); // Guardo los datos del usuario
                  console.log(user);
                  this.mostrarMatricularse = true; // Mostrar el botón "Matricularse ahora"                  
                  this.ocultarBotonInicarSesion=false;
                  this.userService.setpermisoMatricula(true);
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

  regresar() {
    this.router.navigate(['/']);
  }

  matricularse() {
    this.router.navigate(['/auth/matricula']);
  }
}
