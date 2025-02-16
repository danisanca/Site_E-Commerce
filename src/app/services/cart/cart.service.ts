import { Injectable } from '@angular/core';
import { CartItem } from '../../interfaces/cartItem';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>(this.getCartFromStorage());

  cart$ = this.cartSubject.asObservable();
  constructor() { }
  private getCartFromStorage(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }

  private updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(i => i.idProduct === item.idProduct);
    if (existingItem) {
      existingItem.quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.updateCartStorage();
    this.cartSubject.next(this.cartItems);
  }

  removeFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter(i => i.idProduct !== itemId);
    this.updateCartStorage();
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    this.cartItems = [];
    this.updateCartStorage();
    this.cartSubject.next(this.cartItems);
  }
}
