import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  register(data: any, rut: File): any {
    const fd = new FormData();
    fd.append('name', data.name);
    fd.append('nit', data.nit);
    fd.append('dv', data.dv);
    fd.append('email', data.email);
    fd.append('password', data.password);
    fd.append('tel', data.tel);
    fd.append('departmentCode', data.department.code);
    fd.append('departmentName', data.department.name);
    fd.append('municipioCode', data.municipio.code);
    fd.append('municipioName', data.municipio.name);
    fd.append('file', rut);
    return this.http.post(`${environment.API_URL}/users/register`, fd);
  }
}
