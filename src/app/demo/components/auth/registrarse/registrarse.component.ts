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
    if (!this.nombre || !this.cedula || !this.direccion || !this.telefono || !this.email || !this.password) {
      const mensaje = 'Ingrese todos los datos';
      this.mostrarError(mensaje);
      return;
    }

    // Lógica para registrar al usuario
    this.usuarioService.registerUsuario({
      nombre: this.nombre,
      cedula: this.cedula,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.email,
      clave: this.password,
      id_rol:'1'
    }).subscribe(
      response => {                
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.mostrarError('Error en el registro. Por favor, inténtelo de nuevo más tarde.');
        console.error('Error en el registro:', error);
      }
    );
  }
}
