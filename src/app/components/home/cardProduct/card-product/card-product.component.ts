import { Component ,Input, OnInit} from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';
import { CartService } from '../../../../services/cart/cart.service';
import { CartItem } from '../../../../interfaces/cartItem';

@Component({
  selector: 'app-card-product',
  imports: [CommonModule,RouterLink],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})

export class CardProductComponent implements OnInit{
  @Input() product!:Product
  showDiscount:boolean=false;
  @Input() showSoldOut:boolean = false;
  price!:number
  priceEnd!:number
  percent!:number
  showButtons:boolean=false;

  constructor(private cartService:CartService){}

  addToCart(product: Product) {
    let finalPrice:number = 0;
    if (product.discount != undefined) {
      finalPrice = parseFloat((product.price - (product.discount.value * product.price) / 100).toFixed(2));
      
    } else {
      finalPrice = parseFloat(product.price.toFixed(2));
    }
    const cartItem: CartItem = { idProduct:product.id, product, quantity: 1, finalPrice };
    this.cartService.addToCart(cartItem);
  }

  ngOnInit(): void {
   
    this.price = this.product.price;
    
    // Verificando se o produto tem desconto
    if (this.product.discount != undefined) {
      this.showDiscount = true;
      this.priceEnd = parseFloat((this.price - (this.product.discount.value * this.price) / 100).toFixed(2));
      this.percent = this.product.discount.value;
      
    } else {
      this.showDiscount = false;
      this.priceEnd = parseFloat(this.product.price.toFixed(2));
      this.percent = 0;
    }
  }



}
