import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import Transacao  from '../models/Transacao';

@Injectable({ providedIn: 'root' })
export class DataService {

   constructor(private http: HttpClient) { }

  getData(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>('http://localhost:5031/transacao')
      .pipe(
        catchError((error) => {
          console.error('Error:', error);
          return of([]); 
        })
      );
  }

  postData(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>('http://localhost:5031/transacao', transacao)
    
  }
 
}

