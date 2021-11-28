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
        'http://localhost:3000/contacts'
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
  addContact( contact: ContactModel) {
    if (!contact) {
      return;
    }

    // make sure id of the new Contacy is empty
    contact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, contact: ContactModel }>('http://localhost:3000/contacts',
      contact,
      { headers: headers })
      .subscribe(
        (responseData: { contact: ContactModel; }) => {
          // add new contact to contacts
          this.contacts.push(responseData.contact);
          this.contacts.sort((a, b) => (a.id < b.id ? 1 : 0));
        }
      );
  }
  updateContact(originalContact: ContactModel, newContact: ContactModel){
    if (!originalContact || !newContact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === originalContact.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Contact to the id of the old Contact
    newContact.id = originalContact.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response | any) => {
          this.contacts[pos] = newContact;
          this.contacts.sort((a, b) => (a.id < b.id ? 1 : 0));
        }
      );
  }
  deleteContact(contact: ContactModel) {
    if (!contact) {
      return;
    }

    const pos = this.contacts.findIndex(d => d.id === contact.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response | any) => {
          this.contacts.splice(pos, 1);
          this.contacts.sort((a, b) => (a.id < b.id ? 1 : 0));
        }
      );
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
