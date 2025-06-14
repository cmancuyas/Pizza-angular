import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza.model';

@Injectable({
  providedIn: 'root',
})
export class PizzasService {
  private apiUrl = 'http://localhost:5000/api/pizzas';
  constructor(private http: HttpClient) {}

  getAll(): Observable<Pizza[]> {
    return this.http.get<Pizza[]>(this.apiUrl);
  }

  getById(id: number): Observable<Pizza> {
    return this.http.get<Pizza>(`${this.apiUrl}/${id}`);
  }

  create(pizza: Pizza): Observable<Pizza> {
    return this.http.post<Pizza>(this.apiUrl, pizza);
  }

  update(id: number, pizza: Pizza): Observable<Pizza> {
    return this.http.put<Pizza>(`${this.apiUrl}/${id}`, pizza);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
