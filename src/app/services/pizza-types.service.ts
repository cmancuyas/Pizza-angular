import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PizzaType } from '../models/pizza-type.model';

@Injectable({
  providedIn: 'root'
})
export class PizzaTypesService {
  private apiUrl = 'http://localhost:5000/api/pizza-types'; // Change to your backend URL

  constructor(private http: HttpClient) {}

  getAll(): Observable<PizzaType[]> {
    return this.http.get<PizzaType[]>(this.apiUrl);
  }

  getById(id: number): Observable<PizzaType> {
    return this.http.get<PizzaType>(`${this.apiUrl}/${id}`);
  }

  create(pizzaType: PizzaType): Observable<PizzaType> {
    return this.http.post<PizzaType>(this.apiUrl, pizzaType);
  }

  update(id: number, pizzaType: PizzaType): Observable<PizzaType> {
    return this.http.put<PizzaType>(`${this.apiUrl}/${id}`, pizzaType);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // For upload, to be implemented later
}
