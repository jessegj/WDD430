import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactModel } from '../contact.model';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

@Output() selectedContactEvent = new EventEmitter<ContactModel>();

onSelected(contact:ContactModel) {
  this.selectedContactEvent.emit(contact);
}


  contacts: ContactModel[] = [
    new ContactModel('1', 'R. Kent Jackson', 'jacksonk@byui.edu', '208-496-3771', 'assets/images/LarsPedersen.JPG', 'NULL'),
    new ContactModel('2', 'Rex Barzee', 'barzeer@byui.edu', '208-496-3768', 'assets/images/AndersPedersen.JPG', 'NULL')
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
