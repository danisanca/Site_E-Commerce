import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product';
import { Category } from '../../interfaces/category';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../services/produtos/produtos.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { StockService } from '../../services/stock/stock.service';
import { Stock } from '../../interfaces/stock';
import { CardProductComponent } from "../home/cardProduct/card-product/card-product.component";


@Component({
  selector: 'app-products',
  imports: [CommonModule, CardProductComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {
  //Variaveis de Visualização
  showResultDetails:boolean = true;
  textResultDetails:string = "Quarto";
  //Imports
  products!:Product[];
  cartegories!:Category[];
  stocks!:Stock[];
  //-Filtros
  categorySelected:string="";
  findProduct:string="";
  modeClassify_A_Z:boolean = true;

  constructor(private productService:ProdutosService,
    private categoriesService:CategoriesService,
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {

    this.products = this.productService.getAllProducts();
    this.stocks = this.stockService.getAllStocks();
    this.cartegories = this.categoriesService.getAllCategories();
    this.showResultFilter();
    
  }

  showResultFilter(){
    if(this.categorySelected === ""){
      this.showResultDetails = false;
      this.textResultDetails = "";
    }else{
      this.showResultDetails = true;
      this.textResultDetails = this.categorySelected;
    }
  }
}
