import { Component ,Input, OnInit} from '@angular/core';
import { Product } from '../../../../interfaces/product';
import { CommonModule } from '@angular/common';
import {  Router } from '@angular/router';
import { CartService } from '../../../../services/cart/cart.service';
import { Cart, CartCreate,CartUpdate,ItemCart } from '../../../../interfaces/cartItem';
import { getUserIdFromToken } from '../../../../helpers/functionsHelpers';
import { AuthService } from '../../../../services/auth/auth.service';

@Component({
  selector: 'app-card-product',
  imports: [CommonModule],
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

  constructor(private cartService:CartService,private router: Router,private auth:AuthService){}

  addToCart(product: Product) {
    var isLoged = this.auth.isAuthenticated();
    if(isLoged == false){
      this.router.navigate(['/login']);
    }
    else{
    var userId = getUserIdFromToken();
    let cart: Cart = {} as Cart;
    this.cartService.getByUserId(userId!).subscribe(response =>{
    cart.cartHeader = response.cartHeader;
    cart.cartDetail = response.cartDetail;
    if(cart.cartHeader == null){
      let cartModel:CartCreate = {
        userId: userId!,
        item:
          {
            count:1,
            productId:product.id!,
            price:product.price,
            discount:product.discount?.percentDiscount == null ? 0 : product.discount?.percentDiscount,
            productName:product.name,
            description:product.description
          },
        
      };

      this.cartService.create(cartModel).subscribe({
        next: (res) => {
          this.router.navigate(['/products', product.id]);
        },
        error: (err) => {
          console.error('Erro no login:', err);
        },
      });
    }
    else{
      let cartModel:CartUpdate = {
        cartHeaderId:cart.cartHeader.id,
        userId: userId!.toString(),
        item:{
            count:1,
            productId:product.id!,
            price:product.price,
            discount:product.discount?.percentDiscount == null ? 0 : product.discount?.percentDiscount,
            productName:product.name,
            description:product.description
          },
        
      };
      let onCart = false;
      cart.cartDetail.forEach(item => {
        if(item.productId == product.id ){
          onCart = true;
        }
      });
      
      if(onCart == false){
        this.cartService.update(cartModel).subscribe({
        next: (res) => {
          this.router.navigate(['/products', product.id]);
        },
        error: (err) => {
          console.error('Erro no login:', err);
        },
      });
      }
      else{
         this.router.navigate(['/products', product.id]);
      }

    }
  }); 

  }
    
  }

  ngOnInit(): void {
  
    this.price = this.product.price;
    
    // Verificando se o produto tem desconto
    if (this.product.discount != undefined) {
      this.showDiscount = true;
      this.priceEnd = parseFloat((this.price - (this.product.discount.percentDiscount * this.price) / 100).toFixed(2));
      this.percent = this.product.discount.percentDiscount;
    } else {
      this.showDiscount = false;
      this.priceEnd = parseFloat(this.product.price.toFixed(2));
      this.percent = 0;
    }
  }
  goToDetails(product: Product) {
    this.router.navigate(['/products', product.id]);
  }
}
