import { Component,Input  } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Category} from '../../../../interfaces/category'
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-category',
  imports: [CommonModule],
  templateUrl: './card-category.component.html',
  styleUrl: './card-category.component.css'
})

export class CardCategoryComponent {
  @Input() category!:Category

  constructor(private router: Router) {}

  goProducts():void {
    this.router.navigate(['/products'], { state: { categorySelected: this.category.name } });
  }

}
