import { Product } from "./product";

export interface PurchaseOrder
{
    id?:number;
    cartProducts:Item[];
    priceTotal:number;
    externalReference:string;
    status:string;
    createdAt:Date;
}
export interface Item
{
    idProduct:number;
    product:Product;
    quantity:number;
    finalPrice:string;
    
}