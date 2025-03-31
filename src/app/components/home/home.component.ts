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
import { response } from 'express';

@Component({
  selector: 'app-home',
  imports: [CommonModule, CardCategoryComponent, CardProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  canShow: boolean = true;
  categories: Category[] = [];
  products: Product[] = [];
  stocks!:Stock[];
  productList!:any[];
  constructor(private productService:ProdutosService,
    private categoriesService:CategoriesService,){}
  
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(response => {
      this.products = response.data;
    });
    this.categoriesService.getAllCategories().subscribe(response => {
      this.categories = response.data;
    });
    this.updateListProducts();
  }
  
  updateListProducts(){
      let filterProducts = this.products.map(product => ({
        ...product,
        showSoldOut: product.Stock == null ? false : true
      }));
    this.productList = filterProducts
    .sort(() => Math.random() - 0.5) 
    .slice(0, 4);;
  }
  
}
