import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { DocumentModel } from '../document.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {

  @Output() selectedDocumentEvent = new EventEmitter<DocumentModel>();

  documents: DocumentModel[] = [

  new DocumentModel('1', 'Bob', 'Description', 'A Website', 'children')

  ]

  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document:DocumentModel) {
    this.selectedDocumentEvent.emit(document);
  }
}
