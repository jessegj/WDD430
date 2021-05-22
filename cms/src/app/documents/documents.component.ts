import { Component, OnInit } from '@angular/core';
import { DocumentModel } from './document.model';
import { DocumentService } from './document.service';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  selectedDocument:DocumentModel;

  constructor(private document: DocumentService) { }

  ngOnInit(): void {
    this.document.documentSelectedEvent.subscribe((document: DocumentModel) => {
      this.selectedDocument = document;
    });
  }

}
