import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDetail } from '../models/order-details.model';

@Injectable({
  providedIn: 'root'
})
export class OrderDetailsService {
  private apiUrl = 'http://localhost:5000/api/order-details';

    constructor(private http: HttpClient) {}

  getAll(): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(this.apiUrl);
  }

  getById(id: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl}/${id}`);
  }

  create(orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(this.apiUrl, orderDetail);
  }

  update(id: number, orderDetail: OrderDetail): Observable<OrderDetail> {
    return this.http.put<OrderDetail>(`${this.apiUrl}/${id}`, orderDetail);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
