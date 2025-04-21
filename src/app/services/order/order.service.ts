import { Injectable } from '@angular/core';
import { Order } from '../../interfaces/order';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseApiUrl = environment.apiUrl;
  private apiUrl = `${this.baseApiUrl}/Payment`;

  constructor(private http: HttpClient) { }

  paymentMercadoPago(order: Order): Observable<any> {
    return this.http.post<{ apiUrl: string }>(`${this.apiUrl}/MercadoPago`, order).pipe(
      map(res => res.apiUrl)
    );
  }
}
