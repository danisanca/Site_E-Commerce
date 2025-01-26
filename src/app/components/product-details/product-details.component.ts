import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { Image } from '../../interfaces/image';
import { ProdutosService } from '../../services/produtos/produtos.service';
import { ActivatedRoute, Router ,RouterLink} from '@angular/router';
import { ImagesService } from '../../services/images/images.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink,CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit {
  product!:Product;
  images!:Image[];

  constructor(
    private productService:ProdutosService,
    private imagesService:ImagesService,
    private route: ActivatedRoute,
    private router: Router){}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if(id === undefined || id <= 0){
      this.router.navigate(['/'])
      }

    this.product = this.productService.getProductsById(id)
    if(this.product !=null||this.product !=undefined){
        this.images = this.imagesService.getImagesByProductId(this.product.id!)
      }    

    this.images.forEach(element => {
        console.log(element.imageUrl);
      });
  }

}
