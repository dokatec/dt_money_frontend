import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import Transacao from '../models/Transacao';

@Injectable({ providedIn: 'root' })
export class DataService {
  private apiUrl = 'http://localhost:5031/transacao';

  constructor(private http: HttpClient) { }

  getTransacoes(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.apiUrl);
  }

  getTotal(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/total`);
  }

  addTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(this.apiUrl, transacao)
      .pipe(
        catchError(this.handleError<Transacao>('addTransacao'))
      );

  }

  deleteTransacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };


  }
}

