import { Component, OnInit, Input } from '@angular/core';
import { ContactModel } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  @Input() contact: ContactModel;

  // contact: ContactModel[] = [
  //   new ContactModel('1', 'R. Kent Jackson',/* 'jacksonk@byui.edu', '208-496-3771',*/ 'asstes/images/LarsPedersen.JPG'),//, 'NULL'),
  //   new ContactModel('2', 'Rex Barzee',/* 'barzeer@byui.edu', '208-496-3768',*/ 'assests/images/AndersPedersen.JPG')//, 'NULL')
  //  ];

  constructor() { }

  ngOnInit(): void {
  }

}
