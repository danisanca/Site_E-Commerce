import { Injectable } from '@angular/core';
import { Order } from '../../interfaces/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor() { }
  createOrder(order:Order): void{
       console.log(order);
    }
}
