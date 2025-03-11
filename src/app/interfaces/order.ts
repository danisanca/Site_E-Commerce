import { CartItem } from "./cartItem";

export interface Order{
    id?:number;
    userId:number;
    cartList:CartItem[];
    typePayment:string;
    address:string;
    postalCode:string;
    cardDetails?: CardDetails;
    date:Date;
}
export interface CardDetails {
    nickName: string;
    cardNumber: string;
    cardHolder: string;
    cardExpiration: string;
    cardCVC: string;
    documentNumenber: string;
}