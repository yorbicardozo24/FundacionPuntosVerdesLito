import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Foundation, FoundationX, FoundationXs } from '../models/Foundations';

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

  getOds(): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/ods`,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }

  getCs(): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/cs`,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }

  saveFoundation(data: any, cs: string, ods: string, image: File): Observable<any> {
    const fd = new FormData();
    fd.append('file', image);
    fd.append('name', data.name);
    fd.append('nit', data.nit);
    fd.append('email', data.email);
    fd.append('description', data.description);
    fd.append('cs', cs);
    fd.append('ods', ods);
    fd.append('departmentCode', data.departments.code);
    fd.append('departmentName', data.departments.name);
    fd.append('municipioCode', data.municipios.code);
    fd.append('municipioName', data.municipios.name);
    fd.append('points', data.points);

    return this.http
      .post(`${environment.API_URL}/foundations`, fd,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }

  updateFoundation(data: any, id: number): Observable<any> {
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
