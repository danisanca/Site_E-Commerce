import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapLocation } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { MessageContact } from '../../interfaces/messageContact';
import { FormsModule } from '@angular/forms';
import { MessageContactService } from '../../services/contact/message-contact.service';

@Component({
  selector: 'app-contact',
  imports: [CommonModule,FontAwesomeModule,FormsModule ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent{
  faMapLocation = faMapLocation;
  faPhone = faPhone;
  faClock = faClock;
  
  messageContact:MessageContact = {
    name: '',
    email: '',
    subject: '',
    message: '',
    date: new Date()
  };

  constructor(private contactService: MessageContactService) {}
  
  sendMessage():void{
    this.contactService.createMessage(this.messageContact);
    this.messageContact = { name: '', email: '', subject: '', message: '', date: new Date() };
  }


}
