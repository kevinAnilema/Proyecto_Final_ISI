import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  providers: [MessageService]
})
export class CrudUserComponent implements OnInit{

  public DatosUser: any[]; // Variable para almacenar los datos
  userDialog: boolean = false; // Propiedad para controlar la visibilidad del modal
  id='';
  nombre='';
  cedula='';
  correo='';
  clave='';
  direccion='';
  telefono='';
  rol='';
  fechaMatricula=''
  nombrePeriodo=''
  desdePeriodo=''
  hastaPeriodo=''
  nombreSemestre=''
  nombreCarrera=''

  constructor(
    private datosUsuerioService: UserService, 
    private servicioUsuario: UsuarioService,
    private service: MessageService,
  ) { }


  ngOnInit(): void {
    this.DatosUser = this.datosUsuerioService.getDatosUser();
    if (this.DatosUser && this.DatosUser.length > 0) {
      const user = this.DatosUser[0].usuario;
      this.id = user.idUsuario;
      this.nombre = user.nombre;
      this.cedula = user.cedula;
      this.correo = user.correo;
      this.clave = user.clave;
      this.direccion = user.direccion;
      this.telefono = user.telefono;
      this.rol=user.rol;
      this.fechaMatricula = this.DatosUser[0].fecha;
      const periodo=this.DatosUser[0].periodo;
      this.nombrePeriodo=periodo.nombre
      this.desdePeriodo=periodo.desde
      this.hastaPeriodo=periodo.hasta
      const semestre = this.DatosUser[0].semestre;
      this.nombreSemestre=semestre.nombre
      this.nombreCarrera=semestre.carrera.nombre
    } else {
      console.error('No se encontraron datos de usuario');
    }
    
    console.log(this.DatosUser);
   }
  
   mostrarMensaje(mensaje: string) {
    this.service.add({ key: 'tst', severity: 'success', summary: 'Mensaje', detail: mensaje });
  }
  mostrarMensajeError(mensaje: string) {
    this.service.add({ key: 'tst', severity: 'error', summary: 'Mensaje', detail: mensaje });
  }
  showDialog() {
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
  }
  actualizarDatosUser(){
    const usuarioActualizado = {
      idUsuario: this.id,
      nombre: this.nombre,
      cedula: this.cedula,
      correo: this.correo,
      clave: this.clave,
      direccion: this.direccion,
      telefono: this.telefono,
      rol: this.rol
    };
    this.servicioUsuario.putUsuario(usuarioActualizado).subscribe(
      response=>{        
        this.mostrarMensaje('Usuario actualizado');
        this.hideDialog();
        this.datosUsuerioService.setDatosUser([ { usuario: usuarioActualizado } ]);
      },
      error=>{
        this.mostrarMensajeError('Error en la verificación del correo electrónico. Por favor, inténtelo de nuevo más tarde.');
        console.log('Error al actualizar datos del usuario')
      }    
    )
  }
}
