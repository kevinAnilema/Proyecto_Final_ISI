import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MateriasService {
  private API_SERVIDOR = environment.API;

  constructor(private http: HttpClient) { }

  getMaterias(semestre: any): Observable<any> {
    return this.http.get(`${this.API_SERVIDOR}/materia/${semestre}`)
      .pipe(
        catchError(this.handleError<any>('No se ha podido encontrar las materias'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}