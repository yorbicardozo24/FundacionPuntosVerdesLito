import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { User } from '../models/User';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/users`, { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) });
  }

  getUser(id: string): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/users/${id}`, { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token}) });
  }

  saveUser(user: User): Observable<any> {
    return this.http
      .post(`${environment.API_URL}/users`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http
      .delete(`${environment.API_URL}/users/${id}`, { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token}) });
  }

  updateUser(id: string, updatedUser: User): Observable<any> {
    return this.http
      .put(`${environment.API_URL}/users/${id}`, updatedUser,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token}) }
      );
  }

}
