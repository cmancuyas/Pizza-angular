import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { PizzaType } from '../models/pizza-type.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PizzaTypesService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  add(pizzaType: PizzaType): Observable<PizzaType> {
    return this.http.post<PizzaType>(`${this.apiUrl}/PizzaTypes`, pizzaType);
  }

  update(pizzaTypeId: string, pizzaType: PizzaType): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/PizzaTypes/${pizzaTypeId}`, pizzaType);
  }

  delete(pizzaTypeId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/PizzaTypes/${pizzaTypeId}`);
  }

  getAll(page?: number, pageSize?: number): Observable<{ items: PizzaType[], total: number }> {
    let url = `${this.apiUrl}/PizzaTypes`;
    const params: string[] = [];

    if (page !== undefined) params.push(`pageNumber=${page}`);
    if (pageSize !== undefined) params.push(`pageSize=${pageSize}`);
    if (params.length) url += '?' + params.join('&');

    return this.http.get<PizzaType[]>(url, { observe: 'response' }).pipe(
      map(resp => ({
        items: resp.body || [],
        total: +(resp.headers.get('X-Total-Count') ?? 0)
      }))
    );
  }

  getById(pizzaTypeId: string): Observable<PizzaType> {
    return this.http.get<PizzaType>(`${this.apiUrl}/PizzaTypes/${pizzaTypeId}`);
  }
}
