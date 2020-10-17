import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DonateService {

  constructor(private http: HttpClient) { }

  donate(id: any, data: any): Observable<any> {
    return this.http
      .post(`${environment.API_URL}/foundations/donate/${id}`, data,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) });
  }

}
