import { Component, OnInit } from '@angular/core';

import { ContactModel } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contacts: ContactModel[] = [];

  selectedContact?: ContactModel;

  constructor() { }

  ngOnInit(): void {
  }

  onSelected(contact: ContactModel) {
    this.selectedContact = contact;
    //console.log(this.selectedContact);
  }

}
