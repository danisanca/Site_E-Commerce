import { Injectable } from '@angular/core';
import { Category } from '../../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  categories: Category[] = [
    { id: 1, name: 'Quarto', imageUrl: 'https://picsum.photos/400/500?random=1' },
    { id: 2, name: 'Sala de Jantar', imageUrl: 'https://picsum.photos/400/500?random=2' },
    { id: 3, name: 'Sala de Estar', imageUrl: 'https://picsum.photos/400/500?random=3' },
  ];

  constructor() { }
  getAllCategories(): Category[] {
      return this.categories;
    }
}
