import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';

import { UserResponse, UserLogin } from '../models/User';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(authData: UserLogin): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.API_URL}/login`, authData)
      .pipe(
        map((res: UserResponse) => {
          console.log('Res->', res);
          // saveToken()
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  logout(): void {}
  private readToken(): void {}
  private saveToken(): void {}

  private handlerError(err): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';

    if (err) {
      errorMessage = `Error: ${err.error.message}`;
      return throwError(errorMessage);
    }

    return throwError(errorMessage);
  }

}
