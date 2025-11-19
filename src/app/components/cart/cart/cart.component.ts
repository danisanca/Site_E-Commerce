import { Component, OnInit,} from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Cart, CartDetail, CartUpdate, CheckOutCartMsg } from '../../../interfaces/cartItem';
import { firstValueFrom } from 'rxjs';
import { getUserIdFromToken } from '../../../helpers/functionsHelpers';
import { StockService } from '../../../services/stock/stock.service';
import { Stock } from '../../../interfaces/stock';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit{
 //Calculo Resumo
  finalPrice:string = "";
  userId:string = "";
  cartUser: Cart = {} as Cart;


  constructor(
    private cartService:CartService,
    private router: Router,
    private stockService: StockService,
    private auth:AuthService){}

  goToPayment():void{
    if(this.cartUser.cartHeader != null){
      this.cartService.checkOut().subscribe({
                next: async (res:CheckOutCartMsg) => {
                  if(res.id != ""){
                    await this.refreshCart();
                    this.router.navigate(['/payment',res.id])
                   
                  }
                },
                error: (err) => {
                  console.error('Erro com o checkout:');
                  console.error(err);
                },
              });
    }
    else{
      this.router.navigate(['/'])
    }
    
    
  }


  decreaseQuantity(itemCart:CartDetail):void{
    var isLoged = this.auth.isAuthenticated();
      if(isLoged == false){
        this.router.navigate(['/login']);
      }
      else{
      if(itemCart.count > 1){
          let cartModel: CartUpdate = {
            cartHeaderId: itemCart.cartHeaderId,
            userId: this.userId,
            item: {
              count: itemCart.count-1,
              productId: itemCart.productId,
              price: itemCart.price,
              discount:itemCart.discount,
              productName: itemCart.productName,
              description: itemCart.description
            },
          };
          this.cartService.update(cartModel).subscribe({
          next: async (res) => {
            await this.refreshCart();
          },
          error: (err) => {
            console.error('Erro no login:', err);
          },
        });
        }
    }
   

    
  }
  
  increaseQuantity(itemCart:CartDetail):void{
    var isLoged = this.auth.isAuthenticated();
      if(isLoged == false){
        this.router.navigate(['/login']);
      }
      else{
      if(itemCart.count < itemCart.maxQuantity!){
          let cartModel: CartUpdate = {
            cartHeaderId: itemCart.cartHeaderId,
            userId: this.userId,
            item: {
              count: itemCart.count+1,
              productId: itemCart.productId,
              price: itemCart.price,
              discount:itemCart.discount,
              productName: itemCart.productName,
              description: itemCart.description
            },
          };
          this.cartService.update(cartModel).subscribe({
          next: async (res) => {
            await this.refreshCart();
          },
          error: (err) => {
            console.error('Erro no login:', err);
          },
        });
        }
      }
    
    
  }


  removeItem(cartDetail:CartDetail):void{
    this.cartService.deleteItemById(cartDetail.id).subscribe({
              next:  async (res) => {
                this.refreshCart()
              },
              error: (err) => {
                console.error('Erro no login:', err);
              },
            });;
  }

  clearCart():void{
    if(this.cartUser.cartHeader.id != ""){
        this.cartService.clearCart(this.cartUser.cartHeader.id); 
    }
  }

  async ngOnInit() {
    this.userId = getUserIdFromToken()!;
    this.cartUser =  await this.getCart()
    await this.validStock(this.cartUser);
    this.calcResume();
  }

  async getCart(): Promise<Cart>{
    const response = await firstValueFrom(this.cartService.getByUserId(this.userId));
    return response;
  }

  async validStock(cart: Cart) {
  for (let item of cart.cartDetail) {
    const stock: Stock = await firstValueFrom(
      this.stockService.getStockByProductId(item.productId)
    );
    item.maxQuantity = stock.amount;
    }
  }

  calcResume():void{
    let newValue:number = 0.0;
    this.cartUser.cartDetail.forEach(item => {
      let value = (item.price-(item.price*(item.discount/100)))*item.count
      newValue += value;
    });
    this.finalPrice = new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(newValue);
  } 

  async refreshCart(){
    let response:Cart = await firstValueFrom(this.cartService.getByUserId(this.userId));
    let newValue:number = 0.0;
    if(response.cartHeader != null){
      response.cartDetail.forEach(item => {
      let value = (item.price-(item.price*(item.discount/100)))*item.count
      newValue += value;
    });
    await this.validStock(response);
    this.cartUser = response;
    this.cartUser = response;
    this.finalPrice = new Intl.NumberFormat('pt-BR', { 
      style: 'currency', 
      currency: 'BRL' 
    }).format(newValue);
    
    }else{
      this.router.navigate(['/'])
    }
    
  }
}
