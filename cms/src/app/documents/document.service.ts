import { Injectable, EventEmitter } from '@angular/core';
import { DocumentModel } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: DocumentModel[] = [];

  documentSelectedEvent = new EventEmitter<DocumentModel>();
  documentChangedEvent = new EventEmitter<DocumentModel[]>();
  documentListChangedEvent = new Subject<DocumentModel[]>();


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
  deleteDocument(document: DocumentModel) {
    if (!document) {
      return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
      return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
  }
}
