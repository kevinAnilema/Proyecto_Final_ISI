import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any = null;
  private datosUser: any = null;
  private permisoMatricula:boolean=false;

  setUser(user: any) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  setDatosUser(datos: any) {
    this.datosUser =datos;
  }

  getDatosUser() {
    return this.datosUser;
  }
  setpermisoMatricula(permiso: any) {
    this.permisoMatricula =permiso;
  }

  getpermisoMatricula() {
    return this.permisoMatricula;
  }
  isLoggedIn() {
    return this.user !== null;
  }

  clearUser() {
    this.user = null;
  }
}
