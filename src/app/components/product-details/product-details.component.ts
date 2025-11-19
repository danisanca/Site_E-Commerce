import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Image } from '../../interfaces/image';
import { ProdutosService } from '../../services/produtos/produtos.service';
import { EvidencesService } from '../../services/evidences/evidences.service';
import { ActivatedRoute, Router ,RouterLink} from '@angular/router';
import { ImagesService } from '../../services/images/images.service';
import { Evidence } from '../../interfaces/evidence';
import { StockService } from '../../services/stock/stock.service';
import { Stock } from '../../interfaces/stock';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart/cart.service';
import { response } from 'express';
import { firstValueFrom } from 'rxjs';
import { Product } from '../../interfaces/product';
import { getUserIdFromToken } from '../../helpers/functionsHelpers';
import { Cart, CartCreate, CartDetail, CartUpdate } from '../../interfaces/cartItem';
import { AuthService } from '../../services/auth/auth.service';
@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  userId:string = "";
  productId:string = "";
  product: Product = {} as Product;
  images:string[] = [] as string[];
  stock:Stock = {} as Stock;
  evidences:Evidence[] = [] as Evidence[];
  //Controle de Imagens
  selectedImage!:string;
  //Avaliações
  numberAvaliations=0;
  //Estoque
  quantity: number = 1; 
  maxQuantity:number=0;
  canBuy:boolean = false;
  //Cart
  onCart:boolean = false;

  constructor(
    private productService:ProdutosService,
    private imagesService:ImagesService,
    private evidenceService: EvidencesService,
    private stockService: StockService,
    private cartService:CartService,
    private route: ActivatedRoute,
    private router: Router,
    private auth:AuthService){}
   
    ngOnInit(): void {
      this.route.paramMap.subscribe(async params => {
          const idProduct = params.get('id')?.toString();
          if (idProduct === undefined || idProduct === "") {
            this.router.navigate(['/'])
          }
          
          else{
            this.productId = idProduct;
            this.userId = getUserIdFromToken()!;
            
            this.productService.getById(idProduct).subscribe(response =>{
                this.product = response;
                this.images = this.product.urlImages!;
                  this.stock = {
                    id: this.product.stock?.id,
                    productId: this.product.stock?.productId as number,
                    amount: this.product.stock?.amount as number,
                    status: this.product.stock?.status as string
                  }
                  this.validStock();
                  this.selectedImage = this.images[0];
            });
            
            var isLoged = this.auth.isAuthenticated();
            if(isLoged == true){
            let cartUser: Cart = {} as Cart;
            cartUser = await this.getCart();//TODO
            if(cartUser.cartHeader != null){
              cartUser.cartDetail.forEach(item => {
              if(item.productId == idProduct){
                this.onCart = true;
                this.quantity = item.count;
              }
            });
            }
           
            this.validOnCart();
            }
            
          }
      });
      
    }
    

    
    increaseQuantity() {
      if(this.onCart == false){
        if(this.quantity < this.maxQuantity){
          this.quantity++;
        }
      }
      else{
        if(this.quantity < this.maxQuantity){
          this.quantity++;
           this.updateCart(this.product);
        }
      }
    }
  
    decreaseQuantity() {
      if(this.onCart == false){
        if (this.quantity > 1) {
          this.quantity--;
        }
      }
      else{
        if (this.quantity > 1) {
        this.quantity--;
        this.updateCart(this.product);
        }
        
      }
    }
    async updateCart(product: Product) {
      var isLoged = this.auth.isAuthenticated();
      if(isLoged == false){
        this.router.navigate(['/login']);
      }
      else{
      let cartUser: Cart = await this.getCart();

      let productOnCart:CartDetail = await this.getProductOnCart();
        if(Object.keys(productOnCart).length === 0){
          //Sem Carrinho
          if(cartUser.cartHeader == null){
            let cartModel:CartCreate = {
                    userId: this.userId,
                    item:
                      {
                        count:this.quantity,
                        productId:product.id!,
                        price:product.price,
                        discount:product.discount?.percentDiscount == null ? 0 : product.discount?.percentDiscount,
                        productName:product.name,
                        description: product.description,
                      },
                    
                  };
            this.cartService.create(cartModel).subscribe({
            next: (res) => {
              this.validOnCart();
            },
            error: (err) => {
              console.error('Erro no login:', err);
            },
        });
          }
          //com carrinho mais produto fora dele
          else{
            
            let cartModel:CartUpdate = {
                cartHeaderId:cartUser.cartHeader.id,
                userId: this.userId,
                item:
                  {
                    count:this.quantity,
                    productId:product.id!,
                    price:product.price,
                    discount:product.discount?.percentDiscount == null ? 0 : product.discount?.percentDiscount,
                    productName:product.name,
                    description:product.description
                  },
                
              };
              this.cartService.update(cartModel).subscribe({
          next: (res) => {
            this.validOnCart();
          },
          error: (err) => {
            console.error('Erro no login:', err);
          },
        });
          }
      
        }
        else{
          let cartModel:CartUpdate = {
                cartHeaderId:cartUser.cartHeader.id,
                userId: this.userId,
                item:
                  {
                    count:this.quantity,
                    productId:product.id!,
                    price:product.price,
                    discount:product.discount?.percentDiscount == null ? 0 : product.discount?.percentDiscount,
                    productName:product.name,
                    description:product.description
                  },
                
              };
              this.cartService.update(cartModel).subscribe({
                next: (res) => {
                  this.validOnCart();
                },
                error: (err) => {
                  console.error('Erro no login:', err);
                },
              });
        }
      }
      }

      async removeItem(){
        let productOnCart:CartDetail = await this.getProductOnCart();
        this.cartService.deleteItemById(productOnCart.id).subscribe({
              next:  (res) => {
                this.validOnCart();
              },
              error: (err) => {
                console.error('Erro no login:', err);
              },
            });
        
      }
      changeImage(image: string) {
        this.selectedImage = image;
      }
      
      getStarType(star: number): string {
        if (this.product?.rating >= star) {
          return 'full'; 
        } else if (this.product?.rating >= star - 0.5) {
          return 'half'; 
        } else {
          return 'empty'; 
        }
      }
  

  async validOnCart(){
    let productOnCart:CartDetail = await this.getProductOnCart();

    if(Object.keys(productOnCart).length === 0){
      this.onCart = false;
    }else{
      this.onCart = true;
    }
  }

  validStock(){
    if(this.stock.amount > 0 && this.stock.status === "Ativo"){
      this.canBuy = true;
      this.maxQuantity = this.stock.amount;
    }else{
      this.canBuy = false;
      this.maxQuantity = 0;
    }
  }
  async getCart(): Promise<Cart>{
    
    const response = await firstValueFrom(this.cartService.getByUserId(this.userId));
    
    return response;
    
    
  }

  async getProductOnCart():Promise<CartDetail>{
    let cartUser: Cart = await this.getCart();
    let productOnCart:CartDetail ={} as CartDetail
    if(cartUser.cartHeader != null){
      cartUser.cartDetail.forEach(item => {
              if(item.productId == this.productId ){
                  productOnCart = item;
              }
              
            });
    }
      return productOnCart;
    }
}
