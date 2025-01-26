import { Injectable } from '@angular/core';
import { Image } from '../../interfaces/image';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {
imagens:Image[]=[
  { id: 1, productId: 1, imageUrl: 'https://picsum.photos/400/500?random=1' },
  { id: 2, productId: 1, imageUrl: 'https://picsum.photos/400/500?random=2' },
  { id: 3, productId: 1, imageUrl: 'https://picsum.photos/400/500?random=3' },
  { id: 4, productId: 2, imageUrl: 'https://picsum.photos/400/500?random=1' },
  { id: 5, productId: 2, imageUrl: 'https://picsum.photos/400/500?random=2' },
  { id: 6, productId: 2, imageUrl: 'https://picsum.photos/400/500?random=3' },

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
