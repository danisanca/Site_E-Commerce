import { CartItem } from "./cartItem";

export interface Order{
    id?:number;
    userId:number;
    cartList:CartItem[];
    finalPrice:number;
    typePayment:string;
    address:string;
    postalCode:string;
    typeDocument?: string;
    documentNumber?: string;
    date:Date;
}
