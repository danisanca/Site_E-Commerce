export interface Product{
    id?:number;
    shopId:number;
    name:string;
    price:number;
    categoria:string;
    imageUrl:string;
    description:string;
    isNew:boolean;
    discount?:{
        value:number
    }
}