import { Injectable, EventEmitter } from '@angular/core';
import { DocumentModel } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documentsService: DocumentModel[] = [];

  documentSelectedEvent = new EventEmitter<DocumentModel>();

  constructor() {
    this.documentsService = MOCKDOCUMENTS;
  }

  getDocuments() {
    return this.documentsService;
  }

  getDocument(id: string) {
    for (let document of this.documentsService) {
      if (document.id == id) {
        return document;
      }
    }
    return null;
  }
}
