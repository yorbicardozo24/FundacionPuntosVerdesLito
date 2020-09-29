import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private http: HttpClient) { }

  getDepartments(): Observable<any> {
    return this.http.get(`${environment.API_URL}/departments`);
  }

  getMunicipio(id: any): Observable<any> {
    return this.http.get(`${environment.API_URL}/departments/${id}`);
  }
}
