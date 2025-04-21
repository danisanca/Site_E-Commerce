import { Stock } from "./stock";

export interface Product{
   
    id?:number;
    shopId:number;
    nameShop:string;
    name:string;
    price:number;
    rating:number;
    categoria:string;
    imageUrl:string[];
    description:string;
    isNew:boolean;
    stock?:Stock;
    discount?:{
        value:number
    }
    
}