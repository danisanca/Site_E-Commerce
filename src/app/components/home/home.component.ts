import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCategoryComponent } from './cardCategory/card-category/card-category.component';
import { CardProductComponent } from './cardProduct/card-product/card-product.component';
import { Category } from '../../interfaces/category';
import { Product } from '../../interfaces/product';
import { ProdutosService } from '../../services/produtos/produtos.service';
import { on } from 'events';
import { CategoriesService } from '../../services/categories/categories.service';
import { Stock } from '../../interfaces/stock';
import { StockService } from '../../services/stock/stock.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardCategoryComponent, CardProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
   //Variaveis de Visualização
  canShow: boolean = true;
   //Imports
  categories: Category[] = [];
  products: Product[] = [];
  stocks!:Stock[];
  productList!:any[];
  constructor(private productService:ProdutosService,
    private categoriesService:CategoriesService,
    private stockService: StockService,){}
  
  ngOnInit(): void {
    this.products = this.productService.getAllProducts()
    this.categories = this.categoriesService.getAllCategories()
    this.stocks = this.stockService.getAllStocks();
    this.productList = this.products;
    this.updateListProducts();
  }
  
  updateListProducts(){
    
      this.productList = this.products.map(product => ({
        ...product,
        showSoldOut: !this.findStock(product.id!) // Define se está esgotado
      }));
    
    
  }
  findStock(productId: number): boolean {
    const stock = this.stocks.find(stock => stock.productId === productId);
    return stock ? stock.amount > 0 : false;
  }
}
