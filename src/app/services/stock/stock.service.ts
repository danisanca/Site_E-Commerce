import { Injectable } from '@angular/core';
import { Stock } from '../../interfaces/stock';

@Injectable({
  providedIn: 'root'
})
export class StockService {
stocks:Stock[]=[
  { id: 1, productId: 1, amount:5, status: 'Ativo' },
  { id: 2, productId: 2, amount:5, status: 'Ativo' },
  { id: 3, productId: 3, amount:5, status: 'Ativo' },
  { id: 4, productId: 4, amount:5, status: 'Ativo' },
  { id: 5, productId: 5, amount:5, status: 'Ativo' },
  { id: 6, productId: 6, amount:5, status: 'Ativo' },
  { id: 7, productId: 7, amount:5, status: 'Ativo' },
  { id: 8, productId: 8, amount:5, status: 'Ativo' },

]
  constructor() { }
  
  getStockByProductId(id: number): Stock {
      console.log('Ativando Service.')
      const findStock = this.stocks.find((stock) => stock.id === id);
      if (!findStock) {
        throw new Error(`Product with id ${id} not found`);
      }
      return findStock;
      
    }
}
