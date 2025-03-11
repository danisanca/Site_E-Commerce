import { Injectable } from '@angular/core';
import { MessageContact } from '../../interfaces/messageContact';

@Injectable({
  providedIn: 'root'
})
export class MessageContactService {

  constructor() { }

  createMessage(message:MessageContact): void{
     console.log(message);
  }
}
