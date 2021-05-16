import { Component, OnInit,Input } from '@angular/core';
import { DocumentModel } from '../document.model';

@Component({
  selector: 'app-document-item',
  templateUrl: './document-item.component.html',
  styleUrls: ['./document-item.component.css']
})
export class DocumentItemComponent implements OnInit {

  @Input() document: DocumentModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
