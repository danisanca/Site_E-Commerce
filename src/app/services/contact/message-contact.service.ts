import { Injectable } from '@angular/core';
import { MessageContact } from '../../interfaces/messageContact';

@Injectable({
  providedIn: 'root'
})
export class MessageContactService {

  constructor() { }
  //Método para criar uma mensagem se solicitação de contato com a loja
  //A ser implementado....
  createMessage(message:MessageContact): void{
     console.log(message);
  }
}
