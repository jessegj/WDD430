import { Injectable, EventEmitter } from '@angular/core';
import { ContactModel } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: ContactModel[] = [];
  contactSelectedEvent = new EventEmitter<ContactModel>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): ContactModel[] {
    return this.contacts;
  }

  getContact(id: string): ContactModel | null {
    for (let contact of this.contacts) {
      if (contact.id == id) {
        return contact;
      }
    }
    return null;
  }
}