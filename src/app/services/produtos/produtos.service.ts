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
        name: 'AGuardanapo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia aspernatur esse minima unde accusantium. Architecto est fugit labore placeat!',
        price: 100,
        rating: 3.5,
        categoria: 'Quarto',
        imageUrl: 'https://picsum.photos/200/300?random=1',
        isNew:false,
        discount: { value: 10 },
      },
      {
        id: 2,
        shopId: 1,
        name: 'BGuardanapo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia aspernatur esse minima unde accusantium. Architecto est fugit labore placeat!',
        price: 200,
        rating: 3.5,
        categoria: 'Quarto',
        imageUrl: 'https://picsum.photos/200/300?random=2',
        isNew:false,
        discount: { value: 10 },
      },
      {
        id: 3,
        shopId: 1,
        name: 'CGuardanapo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia aspernatur esse minima unde accusantium. Architecto est fugit labore placeat!',
        price: 100.50,
        rating: 3.5,
        categoria: 'Quarto',
        imageUrl: 'https://picsum.photos/200/300?random=3',
        isNew:true,
      },
      {
        id: 4,
        shopId: 1,
        name: 'DGuardanapo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia aspernatur esse minima unde accusantium. Architecto est fugit labore placeat!',
        price: 1000.50,
        rating: 3.5,
        categoria: 'Sala de Jantar',
        imageUrl: 'https://picsum.photos/200/300?random=4',
        isNew:false,
        discount: { value: 10 },
      },
      {
        id: 5,
        shopId: 1,
        name: 'EGuardanapo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia aspernatur esse minima unde accusantium. Architecto est fugit labore placeat!',
        price: 10000.52,
        rating: 3.5,
        categoria: 'Sala de Jantar',
        imageUrl: 'https://picsum.photos/200/300?random=5',
        isNew:false,
      },
      {
        id: 6,
        shopId: 1,
        name: 'FGuardanapo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia aspernatur esse minima unde accusantium. Architecto est fugit labore placeat!',
        price: 100000.50,
        rating: 3.5,
        categoria: 'Sala de Jantar',
        imageUrl: 'https://picsum.photos/200/300?random=6',
        isNew:false,
        discount: { value: 10 },
      },
      {
        id: 7,
        shopId: 1,
        name: 'GGuardanapo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia aspernatur esse minima unde accusantium. Architecto est fugit labore placeat!',
        price: 1000000.51,
        rating: 3.5,
        categoria: 'Sala de Estar',
        imageUrl: 'https://picsum.photos/200/300?random=7',
        isNew:true,
      },
      {
        id: 8,
        shopId: 1,
        name: 'HGuardanapo',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat mollitia aspernatur esse minima unde accusantium. Architecto est fugit labore placeat!',
        price: 10.51,
        rating: 3.5,
        categoria: 'Sala de Estar',
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
