import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product';
import { ProdutosService } from '../../services/produtos/produtos.service';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [CommonModule,FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent  {

  searchTerm: string = '';
  filteredProducts: Product[] = [];
  showDropdown:Boolean = false;

  constructor(private productService: ProdutosService,private router: Router) {}

  onSearch() {
    if (!this.searchTerm.trim()) {
      this.filteredProducts = [];
      this.showDropdown = false;
      return;
    }

    this.filteredProducts = this.productService.getProductsByName(this.searchTerm);
    this.showDropdown = this.filteredProducts.length > 0;
  }


  selectProduct(product: Product) {
    this.searchTerm = product.name;
    this.showDropdown = false;
    this.router.navigate(['/products', product.id]); 
    this.searchTerm = "";
  }

  searchOrNavigate() {
    if (!this.searchTerm.trim()) return;

    const matchingProduct = this.filteredProducts.find(p => p.name.toLowerCase() === this.searchTerm.toLowerCase());

    if (matchingProduct) {
      this.router.navigate(['/products', matchingProduct.id]);
    } else {
      this.router.navigate(['/products'], { state: { categorySelected: this.searchTerm } });
      this.searchTerm = "";
    }

    this.showDropdown = false;
  }

  hideDropdownWithDelay() {
    setTimeout(() => this.showDropdown = false, 200);
  }

}
