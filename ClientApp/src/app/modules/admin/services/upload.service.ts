import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadExcel(file: FormData): any {
    return this.http
      .post(`${environment.API_URL}/upload/excel`, file,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }

  updateImage(id: number, img: FormData): Observable<any> {
    return this.http
      .post(`${environment.API_URL}/upload/image/${id}`, img,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token}) }
      );
  }

}
