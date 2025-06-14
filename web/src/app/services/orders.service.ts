import { OrderUpdateDto } from './../models/DTOs/order-detail-update-dto.model';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Order } from '../models/order.model';
import { environment } from '../../environments/environment';
import { OrderCreateDto } from '../models/DTOs/order-create-dto.model';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}/Orders`;
  constructor(private http: HttpClient) {}

  // Flexible getAll with optional paging
  getAll(
    page?: number,
    pageSize?: number
  ): Observable<{ items: Order[]; total: number }> {
    let url = this.apiUrl;
    const params: string[] = [];
    if (page !== undefined) params.push(`pageNumber=${page}`);
    if (pageSize !== undefined) params.push(`pageSize=${pageSize}`);
    if (params.length) url += '?' + params.join('&');

    return this.http.get<Order[]>(url, { observe: 'response' }).pipe(
      map((resp) => {
        const total = +(resp.headers.get('X-Total-Count') ?? 0);
        return {
          items: resp.body || [],
          total,
        };
      })
    );
  }

  getById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiUrl}/${id}`);
  }

  // Accepts only the required fields for new orders (no id/order_id for details)
  create(order: OrderCreateDto): Observable<Order> {
    return this.http.post<Order>(this.apiUrl, order);
  }

  // Accepts id for update, can include details
update(id: number, order: OrderUpdateDto): Observable<Order> {
  return this.http.put<Order>(`${this.apiUrl}/${id}`, order);
}

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
