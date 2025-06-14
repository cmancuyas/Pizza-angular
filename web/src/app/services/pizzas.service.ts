import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Pizza } from '../models/pizza.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PizzasService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  add(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(`${this.apiUrl}/Pizzas`, pizza);
  }

  update(pizzaId: string, pizza: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.apiUrl}/Pizzas/${pizzaId}`, pizza);
  }

  delete(pizzaId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/Pizzas/${pizzaId}`);
  }

  getAll(page?: number, pageSize?: number): Observable<{ items: Pizza[]; total: number }> {
    let url = `${this.apiUrl}/Pizzas`;
    const params: string[] = [];

    if (page !== undefined) params.push(`pageNumber=${page}`);
    if (pageSize !== undefined) params.push(`pageSize=${pageSize}`);
    if (params.length) url += '?' + params.join('&');

    return this.http.get<Pizza[]>(url, { observe: 'response' }).pipe(
      map(response => {
        const total = Number(response.headers.get('X-Total-Count') ?? 0);
        return {
          items: response.body || [],
          total,
        };
      })
    );
  }

  getById(pizzaId: string): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.apiUrl}/Pizzas/${pizzaId}`);
  }
}
