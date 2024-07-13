import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private API_CONSULTAS = environment.API;


  constructor(private http: HttpClient) { 
  }

  getPeriodos(): Observable<any> {
    return this.http.get(`${this.API_CONSULTAS}/periodo`)
      .pipe(
        catchError(this.handleError<any>('getPeriodos'))
      );
  }

  getSemestres(): Observable<any> {
    return this.http.get<any>(`${this.API_CONSULTAS}/semestre`)
      .pipe(
        catchError(this.handleError<any>('getSemestres'))
      );
  }

  getClases(materia: any): Observable<any> {
    const options = {
      headers: {
        'Content-Type': 'application/json'
     }};
    return this.http.post(`${this.API_CONSULTAS}/clase/materia`, materia,options)
      .pipe(
        catchError(this.handleError<any>('getClases'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
 