import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private API_USER_LOGIN = 'http://localhost:8091/avirtual';

  constructor(private http: HttpClient) { }

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

  setSession(token: boolean): void {
    localStorage.setItem('token', String(token)); // Convertir booleano a cadena
    console.log(localStorage);
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('token') === 'true'; // Comparar con la cadena 'true'
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
  registerUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.API_USER_LOGIN}/usuario`, usuario)
      .pipe(
        catchError(this.handleError<any>('registerUsuario'))
      );
  }
}
