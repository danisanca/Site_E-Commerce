import { Injectable } from '@angular/core';
import { Image } from '../../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  imagens:Image[]=[
  { id: 1, productId: 1, imageUrl: 'https://picsum.photos/400/500?random=1' },
  { id: 2, productId: 1, imageUrl: 'https://picsum.photos/400/500?random=2' },
  { id: 3, productId: 2, imageUrl: 'https://picsum.photos/400/500?random=1' },
  { id: 4, productId: 2, imageUrl: 'https://picsum.photos/400/500?random=2' },
  { id: 5, productId: 3, imageUrl: 'https://picsum.photos/400/500?random=1' },
  { id: 6, productId: 3, imageUrl: 'https://picsum.photos/400/500?random=2' },
  { id: 7, productId: 4, imageUrl: 'https://picsum.photos/400/500?random=1' },
  { id: 8, productId: 4, imageUrl: 'https://picsum.photos/400/500?random=2' },
  { id: 9, productId: 5, imageUrl: 'https://picsum.photos/400/500?random=1' },
  { id: 10, productId: 5, imageUrl: 'https://picsum.photos/400/500?random=2' },
  { id: 11, productId: 6, imageUrl: 'https://picsum.photos/400/500?random=1' },
  { id: 12, productId: 6, imageUrl: 'https://picsum.photos/400/500?random=2' },
  { id: 13, productId: 7, imageUrl: 'https://picsum.photos/400/500?random=1' },
  { id: 14, productId: 7, imageUrl: 'https://picsum.photos/400/500?random=2' },
  { id: 15, productId: 8, imageUrl: 'https://picsum.photos/400/500?random=1' },
  { id: 16, productId: 8, imageUrl: 'https://picsum.photos/400/500?random=2' },
  

  ]
  constructor() { }
  getImagesByProductId(productId: number): Image[] {
    const filteredImages = this.imagens.filter(image => image.productId === productId);
    if (!filteredImages) {
      throw new Error(`Product with id ${productId} not found`);
    }
    return filteredImages; 
  }

}
