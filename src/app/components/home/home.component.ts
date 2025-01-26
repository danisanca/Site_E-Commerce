import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardCategoryComponent } from './cardCategory/card-category/card-category.component';
import { CardProductComponent } from './cardProduct/card-product/card-product.component';
import { Category } from '../../interfaces/category';
import { Product } from '../../interfaces/product';
import { ProdutosService } from '../../services/produtos/produtos.service';
import { on } from 'events';
import { CategoriesService } from '../../services/categories/categories.service';

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

  constructor(private productService:ProdutosService,private categoriesService:CategoriesService){}
  
  ngOnInit(): void {
    this.products = this.productService.getAllProducts()
    this.categories = this.categoriesService.getAllCategories()
  }
  

}
