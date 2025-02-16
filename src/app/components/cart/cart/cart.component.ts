import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../interfaces/cartItem';
import { CartService } from '../../../services/cart/cart.service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
 cartList!:CartItem[];

 
  constructor(private cartService:CartService){}
  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartList = items;
    });
  }

}
