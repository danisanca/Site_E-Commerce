import { Stock } from "./stock";

export interface Product{
   
    Id?:number;
    ShopId:number;
    NameShop:string;
    Name:string;
    Price:number;
    Rating:number;
    Categoria:string;
    ImageUrl:string[];
    Description:string;
    isNew:boolean;
    Stock?:Stock;
    Discount?:{
        Value:number
    }
    
}