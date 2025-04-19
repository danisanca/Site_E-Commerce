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
  constructor() {  } //this.clearCartOnInit();
  private getCartFromStorage(): CartItem[] {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  }
  
  private clearCartOnInit() {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  private updateCartStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(item: CartItem) {
    const existingItem = this.cartItems.find(i => i.idProduct === item.idProduct);
    if (existingItem) {
      let amount = existingItem.quantity += item.quantity;
      existingItem.quantity = amount;
    } else {
      let newItem = item;
      if (item.product.discount != undefined) {
        newItem.product.price = parseFloat((item.product.price - (item.product.discount.value * item.product.price) / 100).toFixed(2));
        
      } else {
        newItem.product.price = parseFloat(newItem.product.price.toFixed(2));
      }
      this.cartItems.push(item);
    }
    this.updateCartStorage();
    this.cartSubject.next(this.cartItems);
  }
  removeFromCart(itemId: number) {
    const existingItem = this.cartItems.find(i => i.idProduct === itemId);
    if (existingItem) {
      let amount = existingItem.quantity -= 1;
      if(amount === 0) {
        this.cartItems = this.cartItems.filter(i => i.idProduct !== itemId);
        this.updateCartStorage();
        this.cartSubject.next(this.cartItems);

      }else{
        existingItem.quantity = amount;
        this.updateCartStorage();
        this.cartSubject.next(this.cartItems);
      }
    } 
  }

  removeAllFromCart(itemId: number) {
    this.cartItems = this.cartItems.filter(i => i.idProduct !== itemId);
    this.updateCartStorage();
    this.cartSubject.next(this.cartItems);
  }

  clearCart() {
    localStorage.removeItem('cart');
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }
}
