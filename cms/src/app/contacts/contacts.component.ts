import { Component, OnInit } from '@angular/core';

import { Contacts } from './contact.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  contact: Contacts[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
