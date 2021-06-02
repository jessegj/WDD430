import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ContactModel } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: ContactModel[] = [];
  contactSelectedEvent = new EventEmitter<ContactModel>();
  contactChangedEvent = new EventEmitter<ContactModel[]>();
  contactListChangedEvent = new Subject<ContactModel[]>();

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
  deleteContact(contact: ContactModel) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos< 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}
