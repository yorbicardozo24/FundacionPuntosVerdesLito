import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

import { UserResponse, UserLogin } from '../models/User';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  login(authData: UserLogin): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/login`, authData)
      .pipe(
        map((res: UserResponse) => {
          this.saveToken(res.token);
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    // set userIsLogged = false
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token');
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired ->', isExpired);
    // set userIsLogged = isExpired
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';

    if (err) {
      errorMessage = `Error: ${err.error.message}`;
      return throwError(errorMessage);
    }

    return throwError(errorMessage);
  }

}
