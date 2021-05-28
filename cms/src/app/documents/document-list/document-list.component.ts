import { Component, OnInit } from '@angular/core';
import { DocumentModel } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: DocumentModel[] = [];

  constructor(private document: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.document.getDocuments();
  }
}
