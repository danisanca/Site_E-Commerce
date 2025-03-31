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
  constructor() { this.clearCartOnInit(); } 
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
      if (item.product.Discount != undefined) {
        newItem.product.Price = parseFloat((item.product.Price - (item.product.Discount.Value * item.product.Price) / 100).toFixed(2));
        
      } else {
        newItem.product.Price = parseFloat(newItem.product.Price.toFixed(2));
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
    this.cartItems = [];
    this.updateCartStorage();
    this.cartSubject.next(this.cartItems);
  }
}
