import { Component, OnInit,} from '@angular/core';
import { CartItem } from '../../../interfaces/cartItem';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
 cartList!:CartItem[];
 //Calculo Resumo
 finalPrice:string = "";

calcResume():void{
  let newValue:number = 0.0;
  this.cartList.forEach(item => {
    newValue += (item.finalPrice*item.quantity);
  });
  this.finalPrice = new Intl.NumberFormat('pt-BR', { 
    style: 'currency', 
    currency: 'BRL' 
  }).format(newValue);
}
 
  constructor(
    private cartService:CartService,
    private router: Router){}

  goToPayment():void{
    this.router.navigate(['/payment'])
  }


  decreaseQuantity(idCart:number):void{
    this.cartService.removeFromCart(idCart);
  }

  increaseQuantity(cartItem: CartItem):void{
    const newCartItem: CartItem = { idProduct:cartItem.idProduct, product:cartItem.product,
       quantity: 1, finalPrice:cartItem.finalPrice };
    this.cartService.addToCart(newCartItem);
  }

  removeItem(idProduct:number):void{
    this.cartService.removeAllFromCart(idProduct);
  }

  clearCart():void{
    this.cartService.clearCart();
  }

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartList = items;
      this.calcResume();
    });
  }

}
