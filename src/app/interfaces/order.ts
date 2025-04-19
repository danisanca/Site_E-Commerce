import { CartItem } from "./cartItem";

export interface Order{
    id?:number;
    userId:number;
    cartList:CartItem[];
    typePayment:string;
    address:string;
    postalCode:string;
    typeDocument?: string;
    documentNumber?: string;
    date:Date;
}
