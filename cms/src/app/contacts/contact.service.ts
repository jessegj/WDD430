import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { ContactModel } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  contacts: ContactModel[] = [];
  maxContactId: number;

  contactSelectedEvent = new EventEmitter<ContactModel>();
  contactChangedEvent = new Subject<ContactModel[]>();
  contactListChangedEvent = new Subject<ContactModel[]>();

  constructor(private http: HttpClient) {
    //this.contacts = MOCKCONTACTS;
    this.maxContactId = this.getMaxId();

    this.http
      .get<ContactModel[]>(
        'https://jessegj-cmsproject-default-rtdb.firebaseio.com/contacts.json'
      )
        //success method

      .subscribe(
        (contacts: ContactModel[]) => {
          this.contacts = contacts;
          this.maxContactId = this.getMaxId();
          contacts.sort((a, b) => (a.id < b.id ? 1 : 0));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        //error method
        (error: any) => {
          console.log(error);
        }
      );
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
    //this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
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
    //this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
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
    //this.contactListChangedEvent.next(contactsListClone);
    this.storeContacts();
  }
  storeContacts() {
    const contacts = JSON.stringify(this.contacts.slice());
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http
      .put<ContactModel[]>(
        'https://jessegj-cmsproject-default-rtdb.firebaseio.com/contacts.json',
        this.contacts)
      .subscribe(() => {
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }
}
