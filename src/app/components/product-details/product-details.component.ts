import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
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
import { CartItem } from '../../interfaces/cartItem';
@Component({
  selector: 'app-product-details',
  imports: [RouterLink, CommonModule,FormsModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product!:Product;
  images!:Image[];
  stock!:Stock;
  evidences!:Evidence[];
  //Controle de Imagens
  selectedImage!:string;
  //Avaliações
  numberAvaliations=0;
  availableColors: string[] = ['#ff0000', '#00ff00', '#0000ff'];
  //Seleção de Cor
  selectedColor: string = this.availableColors[0];
  //Estoque
  quantity: number = 1; 
  maxQuantity:number=0;
  canBuy:boolean = false;
  //Cart
  onCart:boolean = false;

  changeImage(image: string) {
    this.selectedImage = image;
  }
  selectColor(color: string) {
    this.selectedColor = color;
  }
  getStarType(star: number): string {
    if (this.product.rating >= star) {
      return 'full'; // Estrela cheia
    } else if (this.product.rating >= star - 0.5) {
      return 'half'; // Meia estrela
    } else {
      return 'empty'; // Estrela vazia
    }
  }
  constructor(
    private productService:ProdutosService,
    private imagesService:ImagesService,
    private evidenceService: EvidencesService,
    private stockService: StockService,
    private cartService:CartService,
    private route: ActivatedRoute,
    private router: Router){}
    
    increaseQuantity() {
      if(this.quantity < this.maxQuantity){
        this.quantity++;
      }
    }
  
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
    addToCart(product: Product) {
        let finalPrice:number = 0;
        if (product.discount != undefined) {
          finalPrice = parseFloat((product.price - (product.discount.value * product.price) / 100).toFixed(2));
          
        } else {
          finalPrice = parseFloat(product.price.toFixed(2));
        }
        const cartItem: CartItem = { idProduct:product.id, product, quantity: this.quantity, finalPrice };
        this.cartService.addToCart(cartItem);
        this.validOnCart();
      }
      removeItem(idProduct:number):void{
        this.cartService.removeAllFromCart(idProduct);
      }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if(id === undefined || id <= 0){
      this.router.navigate(['/'])
      }

    this.product = this.productService.getProductsById(id)

    if(this.product !=null||this.product !=undefined){
        this.images = this.imagesService.getImagesByProductId(this.product.id!)
        this.evidences = this.evidenceService.getEvidencesByProductId(this.product.id!);
        this.stock = this.stockService.getStockByProductId(this.product.id!);
        this.numberAvaliations = this.evidences.length;
        this.validStock();
      }    

    
    this.selectedImage = this.images[0].imageUrl;
    this.validOnCart();
  }
  validOnCart(){
    this.cartService.cart$.subscribe(items => {
      if(items.find(i => i.idProduct === this.product.id)){
        this.onCart = true;
      }
      else{
        this.onCart = false;
      }
    });
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

}
