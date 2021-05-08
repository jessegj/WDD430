import { Component, OnInit } from '@angular/core';

import { Contacts } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  contact: Contacts[] = [
    new Contacts('1', 'R. Kent Jackson',/* 'jacksonk@byui.edu', '208-496-3771',*/ '../images/LarsPedersen.JPG'),//, 'NULL'),
    new Contacts('2', 'Rex Barzee',/* 'barzeer@byui.edu', '208-496-3768',*/ '../images/AndersPedersen.JPG')//, 'NULL')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
