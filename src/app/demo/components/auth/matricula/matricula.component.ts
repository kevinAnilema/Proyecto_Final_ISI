import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { CrudService } from 'src/app/services/cruds/crud.service';
import { DatosService } from 'src/app/services/datos.service';
import { UserService } from 'src/app/services/user.service';
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
export class MatriculaComponent implements OnInit {

  activo = 1;
  fecha: string;
  hora: string;
  cedula: string = '';
  periodo: string = '';
  semestre: string = '';
  nombre: string = '';
  idEstudiante:string = '';
  selectPeriodo: any = null;
  selectSemestre: any = null;

  dropdownItemsPeriodo = [];
  dropdownItemsSemestre = [];
  datosUsuario: any = {};
  loading = [false, false, false, false];

  constructor(
    public layoutService: LayoutService,
    private router: Router,
    private usuarioService: UsuarioService,
    private service: MessageService,
    private datosUserService: DatosService,
    private userService: UserService,
    private crud:CrudService,
  ) {}

  ngOnInit() {
    this.datosUserService.getPeriodos().subscribe(
      response => {
        this.dropdownItemsPeriodo = response.map(periodo => ({
          name: periodo.nombre,
          code: periodo.idPeriodo
        }));
      },
      error => {
        this.mostrarError('Error al cargar periodos. Por favor, inténtelo de nuevo más tarde.');
        console.error('Error en el servidor:', error);
      }
    );

    this.datosUserService.getSemestres().subscribe(
      response => {
        this.dropdownItemsSemestre = response.map(semestre => ({
          name: semestre.nombre,
          code: semestre.idSemestre
        }));
      },
      error => {
        this.mostrarError('Error al cargar semestres. Por favor, inténtelo de nuevo más tarde.');
        console.error('Error en el servidor:', error);
      }
    );
    // Obtener datos del usuario
  const user = this.userService.getUser();
  if (user) {
    this.datosUsuario = user;
    this.nombre = this.datosUsuario.nombre;
    this.cedula=this.datosUsuario.cedula;
    this.idEstudiante=this.datosUsuario.idUsuario;
  } else {
    this.mostrarError('No se encontró el usuario. Por favor, inténtelo de nuevo más tarde.');
  }
      // Formatear la fecha y hora
      this.fecha = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
      this.hora = new Date().toTimeString().split(' ')[0]; // HH:MM:SS
  }

  mostrarError(mensaje: string) {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Mensaje de error', detail: mensaje });
  }

  registrarMatricula() {
    if (!this.cedula || !this.selectPeriodo?.code || !this.selectSemestre?.code || !this.idEstudiante) {
      const mensaje = 'Ingrese todos los datos';
      this.mostrarError(mensaje);
      return;
    }
  
    // Convertir a número
    const idPeriodo: number = parseInt(this.selectPeriodo.code.toString(), 10);
    const idSemestre: number = parseInt(this.selectSemestre.code.toString(), 10);
    const idUsuario: number = parseInt(this.idEstudiante.toString(), 10);
  
    // Lógica para matricular al usuario
    this.crud.postMatricula({
      activo: this.activo,
      fecha: this.fecha,
      hora: this.hora,
      periodo: { idPeriodo: idPeriodo }, // Enviar objeto con ID de periodo
      semestre: { idSemestre: idSemestre }, // Enviar objeto con ID de semestre
      usuario: { idUsuario: idUsuario } // Enviar objeto con ID de usuario
    }).subscribe(
      response => {
        console.log('Usuario matriculado', response);
        this.mostrarError('Usuario matriculado');
        this.router.navigate(['/auth/login']);
      },
      error => {
        this.mostrarError('Error al matricularse. Por favor, inténtelo de nuevo más tarde.');
        console.error('Error en el registro:', error);
      }
    );
  }
  

  regresar() {
    this.router.navigate(['/']);
  }
}
