import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { OrderDetail } from '../models/order-details.model';
import { OrderDetailCreateDto } from '../models/DTOs/order-detail-create-dto.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailsService {
  private apiUrl = `${environment.apiUrl}/OrderDetails`;

  constructor(private http: HttpClient) {}

  getAll(page?: number, pageSize?: number): Observable<{ items: OrderDetail[], total: number }> {
    let url = this.apiUrl;
    const params: string[] = [];
    if (page !== undefined) params.push(`pageNumber=${page}`);
    if (pageSize !== undefined) params.push(`pageSize=${pageSize}`);
    if (params.length) url += '?' + params.join('&');

    return this.http.get<OrderDetail[]>(url, { observe: 'response' }).pipe(
      map(resp => ({
        items: resp.body || [],
        total: +(resp.headers.get('X-Total-Count') ?? 0)
      }))
    );
  }

  getById(id: number): Observable<OrderDetail> {
    return this.http.get<OrderDetail>(`${this.apiUrl}/${id}`);
  }

  create(orderDetail: OrderDetailCreateDto): Observable<OrderDetail> {
    return this.http.post<OrderDetail>(this.apiUrl, orderDetail);
  }

  update(id: number, orderDetail: OrderDetailCreateDto): Observable<OrderDetail> {
    return this.http.put<OrderDetail>(`${this.apiUrl}/${id}`, orderDetail);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
