import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class FoundationsService {

  constructor(private http: HttpClient) { }

  exportToExcel(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: {data: worksheet}, SheetNames: ['data']};
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcel(excelBuffer, excelFileName);
  }

  private saveAsExcel(buffer: any, filename: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, filename + new Date().getTime() + EXCEL_EXT);
  }

  getFoundations(): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/foundations`,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }

  getFoundation(id: number): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/foundation/${id}`,
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

  saveFoundation(data: any): Observable<any> {
    return this.http
      .post(`${environment.API_URL}/foundations`, data,
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

  deletePoints(id: number): Observable<any> {
    return this.http
      .get(`${environment.API_URL}/dpfoundation/${id}`,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }

  historyadmin(): Observable<any>{
    return this.http
      .get(`${environment.API_URL}/historyadmin`,
        { headers: new HttpHeaders({auth : JSON.parse(localStorage.getItem('user')).token }) }
      );
  }

  sendPoints(email: string): Observable<any> {
    return this.http.post(`${environment.API_URL}/sendpoints`, {email});
  }
}
