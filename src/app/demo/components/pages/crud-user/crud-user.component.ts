import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-crud-user',
  templateUrl: './crud-user.component.html',
  providers: [MessageService]
})
export class CrudUserComponent implements OnInit{

  public DatosUser: any[]; // Variable para almacenar los datos
  userDialog: boolean = false; // Propiedad para controlar la visibilidad del diálogo


  
  constructor(private datosUsuerioService: UserService) { }
  ngOnInit(): void {
       this.DatosUser=this.datosUsuerioService.getDatosUser()
       console.log(this.DatosUser)
   }

  // Métodos para mostrar y ocultar el diálogo
  showDialog() {
    this.userDialog = true;
  }

  hideDialog() {
    this.userDialog = false;
  }


}
