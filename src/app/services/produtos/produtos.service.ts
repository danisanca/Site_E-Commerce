import { Injectable } from '@angular/core';
import { Product } from '../../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProdutosService {

  products: Product[] = [
      {
        id: 1,
        shopId: 1,
        name: 'Guardanapo',
        description: 'sem descrição',
        price: 100,
        categoria: 'Cama e Banho',
        imageUrl: 'https://picsum.photos/200/300?random=1',
        isNew:false,
        discount: { value: 10 },
      },
      {
        id: 2,
        shopId: 1,
        name: 'Guardanapo',
        description: 'sem descrição',
        price: 200,
        categoria: 'Cama e Banho',
        imageUrl: 'https://picsum.photos/200/300?random=2',
        isNew:false,
        discount: { value: 10 },
      },
      {
        id: 3,
        shopId: 1,
        name: 'Guardanapo',
        description: 'sem descrição',
        price: 100.50,
        categoria: 'Cama e Banho',
        imageUrl: 'https://picsum.photos/200/300?random=3',
        isNew:true,
      },
      {
        id: 4,
        shopId: 1,
        name: 'Guardanapo',
        description: 'sem descrição',
        price: 1000.50,
        categoria: 'Cama e Banho',
        imageUrl: 'https://picsum.photos/200/300?random=4',
        isNew:false,
        discount: { value: 10 },
      },
      {
        id: 5,
        shopId: 1,
        name: 'Guardanapo',
        description: 'sem descrição',
        price: 10000.52,
        categoria: 'Cama e Banho',
        imageUrl: 'https://picsum.photos/200/300?random=5',
        isNew:false,
      },
      {
        id: 6,
        shopId: 1,
        name: 'Guardanapo',
        description: 'sem descrição',
        price: 100000.50,
        categoria: 'Cama e Banho',
        imageUrl: 'https://picsum.photos/200/300?random=6',
        isNew:false,
        discount: { value: 10 },
      },
      {
        id: 7,
        shopId: 1,
        name: 'Guardanapo',
        description: 'sem descrição',
        price: 1000000.51,
        categoria: 'Cama e Banho',
        imageUrl: 'https://picsum.photos/200/300?random=7',
        isNew:true,
      },
      {
        id: 8,
        shopId: 1,
        name: 'Guardanapo',
        description: 'sem descrição',
        price: 10.51,
        categoria: 'Cama e Banho',
        imageUrl: 'https://picsum.photos/200/300?random=8',
        isNew:false,
        discount: { value: 10 },
      },
    ];

  constructor() {}

  // Método para buscar os itens
  getAllProducts(): Product[] {
    console.log('Ativando Service.')
    return this.products;
  }
  getProductsById(id: number): Product {
    console.log('Ativando Service.')
    const product = this.products.find((product) => product.id === id);
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    return product;
    
  }
}
