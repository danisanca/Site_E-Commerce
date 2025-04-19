export interface PurchaseOrder
{
    id?:number;
    createdAt:Date;
    item:Item;
}
export interface Item
{
    productId:number;
    productName:string;
    amount:number;
    imageUrl:string;
    description:string;
    priceProduct:number;
    priceTotal:number;
    
}