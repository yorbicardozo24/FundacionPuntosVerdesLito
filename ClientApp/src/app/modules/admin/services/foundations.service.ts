import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { Foundation } from '../models/Foundations';

@Injectable({
  providedIn: 'root'
})
export class FoundationsService {

  constructor(private http: HttpClient) { }

  getFoundations(): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/foundations`, 
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }

  saveFoundation(data: Foundation): Observable<any> {
    return this.http
      .post(`${environment.API_URL}/foundations`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }

  updateFoundation(data: Foundation, id: number): Observable<any> {
    return this.http
      .put(`${environment.API_URL}/foundations/${id}`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }

  deleteFoundation(id: number): Observable<any> {
    return this.http
      .delete(`${environment.API_URL}/foundations/${id}`, 
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }
}
