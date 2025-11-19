import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Category } from '../../interfaces/category';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from '../../services/produtos/produtos.service';
import { CategoriesService } from '../../services/categories/categories.service';
import { StockService } from '../../services/stock/stock.service';
import { Stock } from '../../interfaces/stock';
import { CardProductComponent } from "../home/cardProduct/card-product/card-product.component";
import { response } from 'express';
import { Product } from '../../interfaces/product';


@Component({
  selector: 'app-products',
  imports: [CommonModule, CardProductComponent,FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})

export class ProductsComponent implements OnInit {
  //Variaveis de Visualização
  showResultDetails:boolean = true;
  textResultDetails:string = "";
  //Imports
  products!:Product[];
  categories!:Category[];
  productList!:any[];
  //-Filtros
  categorySelected:string="";
  orderMode:string="";
  //Paginação
  currentPage: number = 1;  // Página atual
  itemsPerPage: number = 1; // Número de produtos por página
  sizeList:number=0;
  totalPages: number = 0;   // Total de páginas

  constructor(private productService:ProdutosService,
    private categoriesService:CategoriesService,
    private stockService: StockService) { }
    
  ngOnInit(): void {
    const state = history.state;
//Fluxo vem da home
      if (state && state.categorySelected) {
        this.categoriesService.getAllCategories().subscribe(response => {
          this.categories = response;
        
          let category = state.categorySelected;
          category = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
          
          const isValidCategory = this.categories.some(cat => cat.name.toLowerCase() === category.toLowerCase());
    
          if (isValidCategory) {
            this.categorySelected = category;
            this.updateListProducts();
          } else {
            this.categorySelected = ""; 
            this.updateListProducts();
          }
      
        });
      }
      else{
          this.categoriesService.getAllCategories().subscribe(response => {
          this.categories = response;
        });
        this.updateListProducts();
      }
    
      this.showResultFilter();
      
  }
 
  //OnChangeFunctions
  onCategoryChange(event: any): void {
      this.categorySelected = event.target.value;
      this.updateListProducts();
  }
  onOrderChange(event: any): void {
    this.orderMode = event.target.value;
    this.updateListProducts();
  }

  //Atualiza a lista de produtos
  updateListProducts(){

    this.productService.getAll(this.currentPage,this.itemsPerPage,this.categorySelected).subscribe(response => {
      this.products = response.products;
      this.sizeList = response.sizeList;
      this.updateFilter();
    });
    
  }

  updateFilter(){
    // Aplica a flag `showSoldOut`
    if(this.products != null){
      this.productList = this.products.map(product => ({
      ...product,
      showSoldOut: !this.findStock(product) // Define se está esgotado
      }));
    
    

    // Aplica a ordenação com base em `orderMode`
    if (this.orderMode === 'A-Z') {
      this.productList.sort((a, b) => a.name.localeCompare(b.name));
    } else if (this.orderMode === 'Z-A') {
      this.productList.sort((a, b) => b.name.localeCompare(a.name));
    } else if (this.orderMode === 'MenorPreço') {
      this.productList.sort((a, b) => a.price - b.price);
    } else if (this.orderMode === 'MaiorPreço') {
      this.productList.sort((a, b) => b.price - a.price);
    }
}else{
  this.productList = [];
}
  // Calcula total de páginas
  this.totalPages = Math.ceil(this.sizeList / this.itemsPerPage);
  this.showResultFilter();

  }
  //Verifica Estoque do produto
  findStock(product: Product): boolean {
    if(product.stock != null){
        return true;
    }else{
      return false;
    }
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateListProducts();
    }
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
