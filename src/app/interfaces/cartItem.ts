import { Product } from "./product";


//Crição do carrinho
export interface CartCreate{
    userId:string;
    item:ItemCart;
}
export interface ItemCart{

    count:number;
    productId:string;
    discount:number;
    price:number
    productName:string;
    description:string;
}

//Atualizar do carrinho
export interface CartUpdate{
    cartHeaderId:string;
    userId:string;
    item:ItemCart;
}
//Carrinho ---
export interface CartHeader{
    id:string;
    userId:string;
    updatedAt:string;
}
export interface CartDetail{
    id:string;
    cartHeaderId:string;
    count:number;
    productId:string;
    productName:string;
    description:string;
    price:number;
    discount:number;
    maxQuantity?:number;
}
export interface Cart{
    cartHeader:CartHeader;
    cartDetail:CartDetail[];
}
//Checkout ---
export interface CheckOutCartMsg{
    id:string;
    messageCreated:string;
    userId:string;
    listCount:number;
    cartDetail:CartDetailCheckOut[];
}
export interface CartDetailCheckOut{
    id:string;
    cartHeaderId:number;
    count:number;
    productId:number;
    productName:number;
    description:number;
    price:number;
    discount:number;
}