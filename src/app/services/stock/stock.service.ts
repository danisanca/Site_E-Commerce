import { Injectable } from '@angular/core';
import { Stock } from '../../interfaces/stock';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseApiUrl = environment.apiUrl;
  private apiUrl = `${this.baseApiUrl}/Stock/GetStockByProductId`;
  
  constructor(private http: HttpClient) { }
  
  getStockByProductId(idproductId: number): Observable<Stock> {
      const url = `${this.apiUrl}/${idproductId}`;
      return this.http.get<Stock>(url).pipe(
        catchError(error => {
          console.error('Erro ao buscar imagens:', error);
          return throwError(() => new Error('Erro ao buscar imagens'));
        })
      );
          
    }
}
