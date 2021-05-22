import { Component, Injector, OnInit } from '@angular/core';

import { ContactModel } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})
export class ContactsComponent implements OnInit {
  contacts: ContactModel[] = [];

  selectedContact: ContactModel;

  constructor(private service: ContactService) {}

  ngOnInit(): void {
    this.service.contactSelectedEvent.subscribe((contact: ContactModel) => {
      this.selectedContact = contact;
    });
  }

  onSelected(contact: ContactModel) {
    this.selectedContact = contact;
    //console.log(this.selectedContact);
  }
}
