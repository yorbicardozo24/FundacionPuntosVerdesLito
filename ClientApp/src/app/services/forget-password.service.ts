import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ForgetPasswordService {

  constructor(private http: HttpClient) { }

  sendEmail(email: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/users/forget-password`, {email});
  }

  sendCode(code: number, email: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/users/forget-password-code`, {code, email});
  }

  sendNewPassword(email: string, code: number, password: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/users/change-forget-password`, {email, code, password});
  }
}
