import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from '../../interfaces/Response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private baseApiUrl = environment.apiUrl;
  private apiUrl = `${this.baseApiUrl}/Product`;

  constructor(private http: HttpClient) {}


  getAllProducts(): Observable<Response<Product[]>> {
    return this.http.get<Response<Product[]>>(`${this.apiUrl}/GetAllProductsFullActive`);
  }

  getProductsById(id: number): Observable<Response<Product>> {
     const url = `${this.apiUrl}/GetProductFullById/${id}`;
       return this.http.get<Response<Product>>(url).pipe(
         catchError(error => {
           console.error('Erro ao buscar imagens:', error);
           return throwError(() => new Error('Erro ao buscar imagens'));
         })
       );; 
    
  }
  
}