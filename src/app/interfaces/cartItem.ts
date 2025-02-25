import { Product } from "./product";

export interface CartItem{
    idProduct?:number;
    product:Product;
    quantity:number;
    finalPrice:number;
}