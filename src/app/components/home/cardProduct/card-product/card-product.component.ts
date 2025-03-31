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
    if (product.Discount != undefined) {
      finalPrice = parseFloat((product.Price - (product.Discount.Value * product.Price) / 100).toFixed(2));
      
    } else {
      finalPrice = parseFloat(product.Price.toFixed(2));
    }
    const cartItem: CartItem = { idProduct:product.Id, product, quantity: 1, finalPrice };
    this.cartService.addToCart(cartItem);
  }

  ngOnInit(): void {
   
    this.price = this.product.Price;
    
    // Verificando se o produto tem desconto
    if (this.product.Discount != undefined) {
      this.showDiscount = true;
      this.priceEnd = parseFloat((this.price - (this.product.Discount.Value * this.price) / 100).toFixed(2));
      this.percent = this.product.Discount.Value;
      
    } else {
      this.showDiscount = false;
      this.priceEnd = parseFloat(this.product.Price.toFixed(2));
      this.percent = 0;
    }
  }



}
