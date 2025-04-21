import { Address } from "./Address";

export interface User{
    id?:number;
    name:string;
    email:string;
    status:string;
    typeAccount:string;
    address:Address
}
export interface UserUpdate{
    id?:number;
    name:string;
    email:string;
}
export interface ChangePassword{
    idUser:number;
    CurrentPassword:string;
    NewPassword:string;
    ConfirmNewPassword:string;
}