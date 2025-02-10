import { Component ,Input, OnInit} from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { CommonModule } from '@angular/common';
import {  RouterLink } from '@angular/router';

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
    console.log(this.product.discount);
    console.log(this.showDiscount);
    console.log(this.showSoldOut);
  }



}
