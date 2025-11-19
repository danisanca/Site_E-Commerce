import { Injectable } from '@angular/core';
import {  OrderHeader, OrderToPayment } from '../../interfaces/order';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Console } from 'console';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseApiUrl = environment.orderApiUrl;
  private apiUrl = `${this.baseApiUrl}/Payment`;

  constructor(private http: HttpClient) { }

  paymentMercadoPago(order: OrderToPayment): Observable<any> {
    return this.http.post<{ apiUrl: string }>(`${this.apiUrl}/PaymentMercadoPago`, order).pipe(
      map(res => res.apiUrl)
    );
  }
  GetByOrderToPayment(headerId: string): Observable<OrderHeader> {
        const url = `${this.apiUrl}/GetByOrderToPayment/${headerId}`;
        return this.http.get<OrderHeader>(url);
    }
}
