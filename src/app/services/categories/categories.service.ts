import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private baseApiUrl = environment.mainApiUrl;
  private apiUrl = `${this.baseApiUrl}/Categories`;
  
  constructor(private http: HttpClient) { }

  getAllCategories(): Observable<Category[]>  {
    return this.http.get<Category[]>(`${this.apiUrl}/GetAll`).pipe(
            catchError(error => {
              console.error('Erro ao buscar as categorias:', error);
              return throwError(() => new Error('Erro ao buscar as categorias'));
            })
          );
    }
}