import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/header/header.component";
import { FooterComponent } from "./components/footer/footer.component";
import { CartItem } from './interfaces/cartItem';
import { ProdutosService } from './services/produtos/produtos.service';
import { Product } from './interfaces/product';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit {
  AllProducts: Product[] = [];
  constructor(private productService: ProdutosService) {}
  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((response) => {
      this.AllProducts = response;
    });
  }
  
  title:string = 'SiteEcommerce';
  

  
}
