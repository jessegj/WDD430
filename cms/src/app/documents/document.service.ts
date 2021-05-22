import { Injectable, EventEmitter } from '@angular/core';
import { DocumentModel } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: DocumentModel[] = [];

  documentSelectedEvent = new EventEmitter<DocumentModel>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documents;
  }

  getDocument(id: string) {
    for (let document of this.documents) {
      if (document.id == id) {
        return document;
      }
    }
    return null;
  }
}
