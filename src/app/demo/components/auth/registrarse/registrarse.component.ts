import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
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
export class RegistrarseComponent {
  nombre: string = '';
  cedula: string = '';
  direccion: string = '';
  telefono: string = '';
  email: string = '';
  password: string = '';
  mensaje = '';
  id_Rol=1;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private usuarioService: UsuarioService,
    private service: MessageService
  ) {}

  mostrarError(mensaje: string) {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Mensaje de error', detail: mensaje });
  }

  registrarse() {
    // Validaciones de entrada
    if (!this.nombre || !this.cedula || !this.direccion || !this.telefono || !this.email || !this.password) {
      const mensaje = 'Ingrese todos los datos';
      this.mostrarError(mensaje);
      return;
    }
  
    // Verificación de usuario existente
    this.usuarioService.verificarDbCedula(this.cedula).subscribe(
      (usuarioExistente: any) => {
        if (usuarioExistente) {
          this.mostrarError('Error en el registro. Usuario ya registrado.');
          console.log('Error en el registro: usuario ya registrado');
        } else {
          // Verificación de correo electrónico
          this.usuarioService.verificarDBCorreo(this.email).subscribe(
            (correoExistente: any) => {
              if (correoExistente) {
                this.mostrarError('Error en el registro. Correo ya registrado.');
                console.log('Error en el registro: Correo ya registrado');
              } else {
                // Si el usuario como el correo no existen en la BD, procedemos con el registro
                this.registrarNuevoUsuario();
              }
            },
            error => {
              this.mostrarError('Error en la verificación del correo electrónico. Por favor, inténtelo de nuevo más tarde.');
              console.error('Error en la verificación del correo electrónico:', error);
            }
          );
        }
      },
      error => {
        this.mostrarError('Error en la verificación del usuario. Por favor, inténtelo de nuevo más tarde.');
        console.error('Error en la verificación del usuario:', error);
      }
    );
  }
  
  registrarNuevoUsuario() {
    this.usuarioService.registerUsuario({
      nombre: this.nombre,
      cedula: this.cedula,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.email,
      clave: this.password,
      rol: { idRol: this.id_Rol } // Asignación correcta del id_rol
    }).subscribe(
      response => {
        console.log('id rol', this.id_Rol);
        console.log('datos para el registro', response);
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.mostrarError('Error en el registro. Por favor, inténtelo de nuevo más tarde.');
        console.error('Error en el registro:', error);
      }
    );
  }

  regresar() {
    this.router.navigate(['/']);
  }
  
}
