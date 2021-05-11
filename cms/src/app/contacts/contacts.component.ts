import { Component, OnInit } from '@angular/core';

import { ContactModel } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contact: ContactModel[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
