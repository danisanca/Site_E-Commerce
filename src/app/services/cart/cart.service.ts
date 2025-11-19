import { Injectable } from '@angular/core';
import { BehaviorSubject ,catchError,map,Observable, of, tap} from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Cart, CartCreate, CartDetail, CartUpdate } from '../../interfaces/cartItem';
import { getUserIdFromToken } from '../../helpers/functionsHelpers';

@Injectable({
  providedIn: 'root'
})

export class CartService {
  private baseApiUrl = environment.cartApiUrl;
  private apiUrl = `${this.baseApiUrl}/Cart`;

  private cartSubject = new BehaviorSubject<CartDetail[]>([]);
  cart$ = this.cartSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadInitialCart();
  }

  create(cartModel:CartCreate): Observable<any>{
    const url = `${this.apiUrl}/Create`;
    return this.http.post(url, cartModel).pipe(
      tap(() => this.refreshCart())
      );
  }
  update(cartModel:CartUpdate): Observable<any>{
    const url = `${this.apiUrl}/Update`;
    return this.http.put(url, cartModel).pipe(
      tap(() => this.refreshCart())
      );
  }
  getByUserId(userId: string): Observable<Cart> {
      const url = `${this.apiUrl}/GetById/${userId}`;
      return this.http.get<Cart>(url).pipe(
      tap(() => this.refreshCart())
      );
  }

  deleteItemById(cartDetailId: string): Observable<any> {
      const url = `${this.apiUrl}/DeleteItemById/${cartDetailId}`;
      return this.http.delete(url).pipe(
      tap(() => this.refreshCart())
      );
  }
  clearCart(cartHeaderId: string): Observable<any> {
      const url = `${this.apiUrl}/ClearCart/${cartHeaderId}`;
      return this.http.delete(url).pipe(
      tap(() => this.refreshCart())
      );
  }
  checkOut(): Observable<any> {
      const url = `${this.apiUrl}/CheckOut`;
      return this.http.post(url,null).pipe(
      tap(() => this.refreshCart())
      );
  }

getCartFromApi(): Observable<CartDetail[]> {
    let userId = getUserIdFromToken()!;

    if (userId === "" || userId ===null) {
      
      return of([]);
    }
    const url = `${this.apiUrl}/GetById/${userId}`;


    return this.http.get<Cart>(url).pipe(
      map((response: Cart) => {
        if (response && response.cartDetail && response.cartDetail.length > 0) {
          return response.cartDetail;
        } else {
          return []; 
        }
      }),
      catchError(error => {
        console.error('Erro ao buscar carrinho na API:', error);
        return of([]); 
      })
    );
  }
  refreshCart(): void {
  this.getCartFromApi().subscribe(cartDetails => {
    this.cartSubject.next(cartDetails);
  });
}
  private loadInitialCart(): void {
  this.getCartFromApi().subscribe(
    (cartDetails: CartDetail[]) => {
      this.cartSubject.next(cartDetails);
    },
    error => {
      console.error('Falha ao carregar o carrinho inicial:', error);
      this.cartSubject.next([]);
    }
  );
  }
  
}
