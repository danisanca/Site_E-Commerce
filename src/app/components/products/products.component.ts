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
  productList!:any[];
  //-Filtros
  categorySelected:string="";
  findProduct:string="";
  orderMode:string="";

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
      this.productList = this.products;
      this.updateListProducts();
  }

  //OnChangeFunctions
  onCategoryChange(event: any): void {
      this.categorySelected = event.target.value;
      console.log(this.categorySelected);
      this.updateListProducts();
  }
  onOrderChange(event: any): void {
    this.orderMode = event.target.value;
    console.log(this.orderMode);
    this.updateListProducts();
  }

  //Atualiza a lista de produtos
  updateListProducts(){
    let filteredProducts = this.products;

    // Filtra por categoria, se houver uma selecionada
    if (this.categorySelected !== "") {
      filteredProducts = filteredProducts.filter(product => product.categoria === this.categorySelected);
    }

    // Aplica a flag `showSoldOut`
    this.productList = filteredProducts.map(product => ({
      ...product,
      showSoldOut: !this.findStock(product.id!) // Define se está esgotado
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
  }
  //Verifica Estoque do produto
  findStock(productId: number): boolean {
    const stock = this.stocks.find(stock => stock.productId === productId);
    return stock ? stock.amount > 0 : false;
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
