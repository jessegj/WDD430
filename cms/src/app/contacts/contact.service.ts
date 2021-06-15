import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ContactModel } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: ContactModel[] = [];
  maxContactId: number;

  contactSelectedEvent = new EventEmitter<ContactModel>();
  contactChangedEvent = new Subject<ContactModel[]>();
  contactListChangedEvent = new Subject<ContactModel[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();
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
  getMaxId(): number {
    let maxId = 0;

    for (let contact of this.contacts){
      let currentId = parseInt(contact.id)
      if (currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }
  addContact( newContact: ContactModel) {
    if (!newContact) {
      return;
    }
    this.maxContactId++
    newContact.id = this.maxContactId
    this.contacts.push(newContact);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }
  updateContact(originalContact: ContactModel, newContact: ContactModel){
    if (!originalContact || !newContact ) {
      return;
    }
    const pos = this.contacts.indexOf(originalContact)
    if (pos < 0) {
      return;
    }
    newContact.id = originalContact.id;
    this.contacts[pos] = newContact;
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }
  deleteContact(contact: ContactModel) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    let contactsListClone = this.contacts.slice();
    this.contactListChangedEvent.next(contactsListClone);
  }
}
