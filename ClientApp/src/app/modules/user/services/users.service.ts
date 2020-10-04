import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { User, UserData, PasswordData, Status } from '../models/User';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  newUserName = JSON.parse(localStorage.getItem('user')).userName;
  newUserPoints = JSON.parse(localStorage.getItem('user')).userPoints;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/users`, { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) });
  }

  getUser(id: string): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/users/${id}`, { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token}) });
  }

  saveUser(user: UserData): Observable<any> {
    return this.http
      .post(`${environment.API_URL}/users`, user);
  }

  changePasswordUser(id: string, data: PasswordData): Observable<any> {
    return this.http
    .post(`${environment.API_URL}/users/password/${id}`, data,
      { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token}) }
    );
  }

  changeStatus(id: number, status: Status): Observable<any> {
    return this.http
      .post(`${environment.API_URL}/users/status/${id}`, status,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token}) }
      );
  }

  deletePoints(): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/clearpoints`, { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) });
  }

  deleteUser(id: string): Observable<any> {
    return this.http
      .delete(`${environment.API_URL}/users/${id}`, { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token}) });
  }

  updateUser(id: number, updatedUser: UserData): Observable<any> {
    return this.http
      .put(`${environment.API_URL}/users/${id}`, updatedUser,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token}) }
      );
  }

  patchUser(id: number, user: any): Observable<any> {
    return this.http
      .patch(`${environment.API_URL}/users/${id}`, user,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token}) }
      );
  }

  UserNameService(newUserName: string): void {
    this.newUserName = newUserName;
  }

  UserPointsService(newUserPoints: number): void {
    this.newUserPoints = newUserPoints;
  }

}
