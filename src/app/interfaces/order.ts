

export interface OrderToPayment{
    name:string;
    email:string;
    typePayment:number;
    creditCard?:creditCard;
    address:string;
    postalCode:string;
    typeDocument?: string;
    documentNumber?: string;
    totalPrice:number;
    orderHeaderId: string;
    itens:OrderDetail[];
}
export interface creditCard{
    nameCard:string;
    cardNumber:string;
    cvv:string;
    expiryMonthYear:string;
}
export interface OrderHeader{
    id:string;
    userId:string;
    totalPrice:number;
    totalDiscont:number;
    listCount:number;
    externalReference:string;
    preferenceId:string;
    initPoint:string;
    referenceCreatedAt:string;
    expireAt:string;
    paymentStatus:boolean;
    createdAt:string;
    orderDetailsDto:OrderDetail[];
}
export interface OrderDetail{
    id:string;
    orderHeaderId:string;
    productId:string;
    count:number;
    productName:string;
    price:number;
    discount:number;
    createdAt:string;
}