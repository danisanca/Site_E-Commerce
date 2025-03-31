import { Injectable } from '@angular/core';
import { Evidence } from '../../interfaces/evidence';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from '../../interfaces/Response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvidencesService {
  private baseApiUrl = environment.apiUrl;
    private apiUrl = `${this.baseApiUrl}/Evidence`;
    
    constructor(private http: HttpClient) { }
  
 getEvidencesByProductId(productId: number):  Observable<Response<Evidence[]>> {
   const url = `${this.apiUrl}/GetAllEvidenceByProductId/${productId}`;
       return this.http.get<Response<Evidence[]>>(url).pipe(
         catchError(error => {
           console.error('Erro ao buscar imagens:', error);
           return throwError(() => new Error('Erro ao buscar imagens'));
         })
       );
  }

}
