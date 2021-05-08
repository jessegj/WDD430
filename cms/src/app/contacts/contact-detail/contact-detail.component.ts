import { Component, OnInit } from '@angular/core';
import { Contacts } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  contact: Contacts[] = [
    new Contacts('1', 'R. Kent Jackson',/* 'jacksonk@byui.edu', '208-496-3771',*/ '../images/LarsPedersen.JPG'),//, 'NULL'),
    new Contacts('2', 'Rex Barzee',/* 'barzeer@byui.edu', '208-496-3768',*/ '../images/AndersPedersen.JPG')//, 'NULL')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
