import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-matricula',
  templateUrl: './matricula.component.html',
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
export class MatriculaComponent {
  
  activo: 1;
  fecha: Date;
  hora =Date;
  cedula: string = '';
  periodo: string = '';
  semestre: string = '';
  nombre:string='';
  selectPeriodo: any = null;
  selectSemestre: any = null;

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private usuarioService: UsuarioService,
    private service: MessageService
  ) {}

  dropdownItemsPeriodo = [
    { name: 'Periodo 1', code: 'Option 1' },
    { name: 'Periodo 2', code: 'Option 2' },
    { name: 'Periodo 3', code: 'Option 3' }
];
dropdownItemsSemestre = [
  { name: 'Semestre 1', code: 'Option 1' },
  { name: 'Semestre 2', code: 'Option 2' },
  { name: 'Semestre 3', code: 'Option 3' }
];

  mostrarError(mensaje: string) {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Mensaje de error', detail: mensaje });
  }

  registrarse() {
    if (!this.cedula) {
      const mensaje = 'Ingrese todos los datos';
      this.mostrarError(mensaje);
      return;
    }

    // Lógica para registrar al usuario
    this.usuarioService.registerUsuario({
      activo:this.activo,
      fecha:this.fecha,
      hora:this.hora,
      periodo: this.periodo,
      semestre: this.semestre,
      cedula: this.cedula
    }).subscribe(
      response => {                
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.mostrarError('Error al matricularse. Por favor, inténtelo de nuevo más tarde.');
        console.error('Error en el registro:', error);
      }
    );
  }
}
