import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe((contacts: ContactModel[]) => {
      this.contacts = contacts;
    });
  }
}
