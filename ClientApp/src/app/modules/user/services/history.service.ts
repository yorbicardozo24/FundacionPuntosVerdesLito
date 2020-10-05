import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistory(id: number): Observable<any> {
    return this.http
    .get(`${environment.API_URL}/history/${id}`,
      { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) });
  }

  getReport(): Observable<any> {
    return this.http
    .get(`${environment.API_URL}/report`,
      { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) });
  }
}
