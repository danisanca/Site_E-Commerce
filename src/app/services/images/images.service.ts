import { Injectable } from '@angular/core';
import { Image } from '../../interfaces/image';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  private baseApiUrl = environment.apiUrl;
  private apiUrl = `${this.baseApiUrl}/Payment`;
  
  constructor(private http: HttpClient) { }

  getImagesByProductId(productId: number): Observable<Image[]> {
    const url = `${this.apiUrl}/GetImageByProductId/${productId}`;
    return this.http.get<Image[]>(url);
  }

}
