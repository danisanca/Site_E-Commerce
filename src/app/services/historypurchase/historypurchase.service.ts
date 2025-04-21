import { Injectable } from '@angular/core';
import { PurchaseOrder } from '../../interfaces/PurchaseOrder';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HistorypurchaseService {
private baseApiUrl = environment.apiUrl;
  private apiUrl = `${this.baseApiUrl}/HistoryPurchase`;
  
  constructor(private http: HttpClient) { }

  getHistoryPurchaseById(userId: number): Observable<PurchaseOrder[]> {
    const url = `${this.apiUrl}/GetAllHistoryPurchaseByUserId/${userId}`;
    return this.http.get<PurchaseOrder[]>(url);
  }
  updateHistoryPurchase(external_ref: string, status: string): Observable<any> {
    const url = `${this.apiUrl}/UpdateHistoryPurchase?external_ref=${external_ref}&status=${status}`;
    return this.http.put(url, null); 
  }
}

