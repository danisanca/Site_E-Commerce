import { Injectable } from '@angular/core';
import { Image } from '../../interfaces/image';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Response } from '../../interfaces/Response';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseApiUrl = environment.apiUrl;
  private apiUrl = `${this.baseApiUrl}/Image`;
  
  constructor(private http: HttpClient) { }

  getImagesByProductId(productId: number): Observable<Response<Image[]>> {
    const url = `${this.apiUrl}/GetImageByProductId/${productId}`;
    return this.http.get<Response<Image[]>>(url).pipe(
      catchError(error => {
        console.error('Erro ao buscar imagens:', error);
        return throwError(() => new Error('Erro ao buscar imagens'));
      })
    );
  }

}
