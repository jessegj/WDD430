import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactModel } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css'],
})
export class ContactListComponent implements OnInit {
  @Output() selectedContactEvent = new EventEmitter<ContactModel>();

  onSelected(contact: ContactModel) {
    this.selectedContactEvent.emit(contact);
  }
  contacts: ContactModel[] = [];
  constructor(private service: ContactService) {}

  ngOnInit(): void {
      this.contacts = this.service.getContacts();
  }
}
