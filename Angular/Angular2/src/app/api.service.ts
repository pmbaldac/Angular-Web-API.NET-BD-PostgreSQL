import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  //private apiUrl = 'http://localhost:9097/api/ORDERS_ECOM';
  private apiUrlOrdersEcom = '/api/ORDERS_ECOM';
  private apiUrlValidateCredentials = '/api/ValidateCredentials';
  private apiURLInsertEcomm = '/api/InsertEcomm';

  constructor(private http: HttpClient) { }

  getDataOrdersEcom(): Observable<any> {
    return this.http.get<any>(this.apiUrlOrdersEcom);
  };

  getValidateCredentials(user: string, pass: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlValidateCredentials}?sUser=${encodeURIComponent(user)}&sPass=${encodeURIComponent(pass)}`);
  };

  postInsertEcom (ecommname: string, status: string): Observable<any> {
    const body = { EcommName: ecommname, Status: status };
    return this.http.post<any>(`${this.apiURLInsertEcomm}`, body);
  };
}