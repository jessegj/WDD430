import { Component, OnInit, Input } from '@angular/core';
import { ContactModel } from '../contact.model';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {

  @Input() contact: ContactModel;

  constructor() { }

  ngOnInit(): void {
  }

}
