import { Stock } from "./stock";

export interface Product{
   
    id?:string;
    shopId:number;
    nameShop:string;
    name:string;
    price:number;
    rating:number;
    categoria:string;
    urlImages?:string[];
    description:string;
    isNew:boolean;
    stock?:Stock;
    discount?:{
        percentDiscount:number
    }
}