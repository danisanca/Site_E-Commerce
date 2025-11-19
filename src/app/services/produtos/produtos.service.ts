import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProductResponse } from '../../interfaces/Response/ProductResponse';
@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  private baseApiUrl = environment.mainApiUrl;
  private apiUrl = `${this.baseApiUrl}/Product`;
  constructor(private http: HttpClient) {}


  getAll(actualPage:number, sizePerPage:number, category?:string ): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/GetAllWithDetails?limit=${sizePerPage}&page=${actualPage-1}&category=${category}`);
  }

  getById(id: string): Observable<Product> {
    const url = `${this.apiUrl}/GetWithDetailsById/${id}`;

      return this.http.get<Product>(url);
    
  }
  getAllLikeName(name: string): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(`${this.apiUrl}/GetAllWithDetailsLikeName?name=${name}`);
  }
  
}