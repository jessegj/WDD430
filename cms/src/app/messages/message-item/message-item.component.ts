import { Component, OnInit, Input } from '@angular/core';
import { ContactModel } from 'src/app/contacts/contact.model';
import { ContactService } from 'src/app/contacts/contact.service';
import { Message } from '../message.model';

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {
  @Input() message: Message;
  messageSender: string;

  constructor(private service: ContactService) { }

  ngOnInit(): void {
    const contact: ContactModel | any = this.service.getContact(this.message.sender);
    this.messageSender = contact.name;
  }

}
