import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_USER_LOGIN = 'http://localhost:8091/avirtual';

  constructor(
    private http: HttpClient,
  ) { }

  getUsuario(correo: string, clave: string): Observable<any> {
    return this.http.get(`${this.API_USER_LOGIN}/usuario/login/${correo}/${clave}`)
      .pipe(
        catchError(this.handleError<any>('getUsuario'))
      );
  }

  getMatriculaActiva(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.API_USER_LOGIN}/matricula/activo/${usuarioId}`)
      .pipe(
        catchError(this.handleError<any>('getMatriculaActiva'))
      );
  }

  putUsuario( usuario: any): Observable <any>{
    return this.http.put(`${this.API_USER_LOGIN}/usuario`,usuario)
      .pipe(
        catchError(this.handleError<any>('PutUsuario'))
      );
  }



  setSession(token: boolean): void {
    localStorage.setItem('token', String(token)); // Convertir booleano a cadena
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') === 'true'; // Comparar con la cadena 'true'
  }

  setEstado(estadoMatricula: boolean): void {
    localStorage.setItem('estado', String(estadoMatricula)); // Convertir booleano a cadena
  }
  
  isActive(): boolean {
    const estado = localStorage.getItem('estado');
    console.log(`Estado de matrícula: ${estado}`);
    return estado === 'true';
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  verificarDbCedula(cedula:string): Observable<any> {
    console.log(`Verificando usuario con cédula: ${cedula}`);
    return this.http.get<any>(`${this.API_USER_LOGIN}/usuario/registro/${cedula}`)
    .pipe(
      catchError(this.handleError<any>('UsuarioYaregistrado'))
    );
  }
  verificarDBCorreo(correo:string): Observable<any> {
    return this.http.get<any>(`${this.API_USER_LOGIN}/usuario/correo/${correo}`)
    .pipe(
      catchError(this.handleError<any>('CorreoYaregistrado'))
    );
  }
  registerUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.API_USER_LOGIN}/usuario`, usuario)
      .pipe(
        catchError(this.handleError<any>('registerUsuario'))
      );
  }
}
