import { Injectable } from '@angular/core';
import { Stock } from '../../interfaces/stock';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from '../../interfaces/Response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private baseApiUrl = environment.apiUrl;
  private apiUrl = `${this.baseApiUrl}/Stock/GetImageByProductId/`;
  
  constructor(private http: HttpClient) { }
  
  getStockByProductId(idproductId: number): Observable<Response<Stock>> {
      const url = `${this.apiUrl}/${idproductId}`;
      return this.http.get<Response<Stock>>(url).pipe(
        catchError(error => {
          console.error('Erro ao buscar imagens:', error);
          return throwError(() => new Error('Erro ao buscar imagens'));
        })
      );
          
    }
}
