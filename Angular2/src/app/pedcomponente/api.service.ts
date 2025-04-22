import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApiService {
  //private apiUrl = 'http://localhost:9096/api/ENI_LINKED_ORDERS_ECOM';
  private apiUrl = '/api/ENI_LINKED_ORDERS_ECOM';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}