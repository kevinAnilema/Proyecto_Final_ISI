import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private API_SERVIDOR = environment.API;
  
  constructor(private http: HttpClient) { }

  postMatricula(matricula: any): Observable<any> {
    return this.http.post(`${this.API_SERVIDOR}/matricula`,matricula)
      .pipe(
        catchError(this.handleError<any>('RegistroMatricula'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
 