import { Injectable, EventEmitter } from '@angular/core';
import { DocumentModel } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: DocumentModel[] = [];
  maxDocumentId: number;

  documentSelectedEvent = new EventEmitter<DocumentModel>();
  documentChangedEvent = new EventEmitter<DocumentModel[]>();
  documentListChangedEvent = new Subject<DocumentModel[]>();


  constructor() {
    this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();
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
  getMaxId(): number {
    let maxId = 0;

    for (let document of this.documents){
      let currentId = parseInt(document.id)
      if (currentId > maxId){
        maxId = currentId;
      }
    }
    return maxId;
  }
  addDocument( newDocument: DocumentModel) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++
    newDocument.id = this.maxDocumentId
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
  updateDocument(originalDocument: DocumentModel, newDocument: DocumentModel){
    if (!originalDocument || !newDocument ) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument)
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
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
    let documentsListClone = this.documents.slice();
    this.documentListChangedEvent.next(documentsListClone);
  }
}
