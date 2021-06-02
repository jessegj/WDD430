import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContactModel } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  onSelected(contact: ContactModel) {
    this.contactService.contactSelectedEvent.emit(contact);
  }
  contacts: ContactModel[] = [];
  subscription: Subscription | any;
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe(
      (contacts: ContactModel[]) => {
        this.contacts = contacts;
      }
    );
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contactList: ContactModel[]) => {
        this.contacts = contactList;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
