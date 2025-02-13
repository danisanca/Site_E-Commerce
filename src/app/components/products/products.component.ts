import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  cartegories!:Category[];
  stocks!:Stock[];
  productList!:any[];
  //-Filtros
  categorySelected:string="";
  orderMode:string="";
  //Paginação
  currentPage: number = 1;  // Página atual
  itemsPerPage: number = 2; // Número de produtos por página
  totalPages: number = 1;   // Total de páginas

  constructor(private productService:ProdutosService,
    private categoriesService:CategoriesService,
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router) { }
    
  ngOnInit(): void {
    const state = history.state;
    if (state && state.categorySelected) {
      this.categorySelected = state.categorySelected;
      console.log(`Filtrando produtos pela categoria: ${this.categorySelected}`);
      // Aqui você pode chamar um serviço para buscar produtos filtrados
    }
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
      this.updateListProducts();
  }
  onOrderChange(event: any): void {
    this.orderMode = event.target.value;
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
  // Calcula total de páginas
  this.totalPages = Math.ceil(this.productList.length / this.itemsPerPage);

  // Paginação: exibe apenas os itens da página atual
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  this.productList = this.productList.slice(startIndex, startIndex + this.itemsPerPage);

  this.showResultFilter();
  }
  //Verifica Estoque do produto
  findStock(productId: number): boolean {
    const stock = this.stocks.find(stock => stock.productId === productId);
    return stock ? stock.amount > 0 : false;
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
