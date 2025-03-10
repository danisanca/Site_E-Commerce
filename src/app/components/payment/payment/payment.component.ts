import { Component, OnInit } from '@angular/core';
import { CartItem } from '../../../interfaces/cartItem';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payment',
  imports: [CommonModule,FormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{
  cartList!:CartItem[];
   //Calculo Resumo
   finalPrice:string = "";
   selectedPayment: string = 'CartaoDeCredito';
  constructor(private cartService:CartService){}

  ngOnInit(): void {
    this.cartService.cart$.subscribe(items => {
      this.cartList = items;
      this.calcResume();
    });
  }
  selectPayment():void{
    console.log(this.selectedPayment);
  }
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
}
