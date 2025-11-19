import { Address } from "./Address";

export interface User{
    id?:number;
    nomeCompleto:string;
    email:string;
    status:string;
    typeAccount:string;
    address:Address
}
export interface UserUpdate{
    id?:number;
    nomeCompleto:string;
    email:string;
}
export interface ChangePassword{
    userId:number;
    currentPassword:string;
    newPassword:string;
    ConfirmNewPassword:string;
}