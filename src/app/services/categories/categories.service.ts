import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from '../../interfaces/Response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseApiUrl = environment.apiUrl;
  private apiUrl = `${this.baseApiUrl}/Categories`;
  
  constructor(private http: HttpClient) { }
  getAllCategories(): Observable<Response<Category[]>>  {
    return this.http.get<Response<Category[]>>(`${this.apiUrl}/GetAllActiveCategories`).pipe(
            catchError(error => {
              console.error('Erro ao buscar imagens:', error);
              return throwError(() => new Error('Erro ao buscar imagens'));
            })
          );
    }
}
