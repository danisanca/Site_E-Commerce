import { Injectable } from '@angular/core';
import { ChangePassword, User, UserUpdate } from '../../interfaces/user';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Address } from '../../interfaces/Address';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseApiUrl = environment.apiUrl;
  private apiUrlUser = `${this.baseApiUrl}/User`;
  private apiUrlAddress = `${this.baseApiUrl}/Address`;
  
  constructor(private http: HttpClient) { }
  //User Routes
  getUserById(id: number): Observable<User> {
    const url = `${this.apiUrlUser}/GetUserFullByIdUser/${id}`;
    return this.http.get<User>(url);
  }
  updateUser(user: UserUpdate): Observable<any> {
    const url = `${this.apiUrlUser}/UpdateUser`;
    return this.http.put(url, user);
  }
  ChangePassword(modelChangePassword: ChangePassword): Observable<any> {
    const url = `${this.apiUrlUser}/ChangePassword`;
    return this.http.put(url, modelChangePassword);
  }

  //Adress Routes
  updateUserAddress(address: Address): Observable<any> {
    const url = `${this.apiUrlAddress}/UpdateAddress`;
    return this.http.put(url, address);
  }
}
