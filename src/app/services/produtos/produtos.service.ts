import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private baseApiUrl = environment.apiUrl;
  private apiUrl = `${this.baseApiUrl}/Product`;

  constructor(private http: HttpClient) {}


  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/GetAllProductsFullActive`);
  }

  getProductsById(id: number): Observable<Product> {
     const url = `${this.apiUrl}/GetProductFullById/${id}`;

       return this.http.get<Product>(url);
    
  }
  
}