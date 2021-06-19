import { Injectable, EventEmitter } from '@angular/core';
import { DocumentModel } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private http: HttpClient) {
    //this.documents = MOCKDOCUMENTS;
    this.maxDocumentId = this.getMaxId();

    this.http
      .get<DocumentModel[]>(
        'https://jessegj-cmsproject-default-rtdb.firebaseio.com/documents.json'
      )
        //success method

      .subscribe(
        (documents: DocumentModel[]) => {
          this.documents = documents;
          this.maxDocumentId = this.getMaxId();
          documents.sort((a, b) => (a.id < b.id ? 1 : 0));
          this.documentListChangedEvent.next(this.documents.slice());
        },
        //error method
        (error: any) => {
          console.log(error);
        }
      );
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

    for (let document of this.documents) {
      let currentId = parseInt(document.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  addDocument(newDocument: DocumentModel) {
    if (!newDocument) {
      return;
    }
    this.maxDocumentId++;
    newDocument.id = this.maxDocumentId;
    this.documents.push(newDocument);
    let documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }
  updateDocument(originalDocument: DocumentModel, newDocument: DocumentModel) {
    if (!originalDocument || !newDocument) {
      return;
    }
    const pos = this.documents.indexOf(originalDocument);
    if (pos < 0) {
      return;
    }
    newDocument.id = originalDocument.id;
    this.documents[pos] = newDocument;
    let documentsListClone = this.documents.slice();
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
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
    //this.documentListChangedEvent.next(documentsListClone);
    this.storeDocuments();
  }
  storeDocuments() {
    const documents = JSON.stringify(this.documents.slice());
    const headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    this.http
      .put<DocumentModel[]>(
        'https://jessegj-cmsproject-default-rtdb.firebaseio.com/documents.json',
        this.documents)
      .subscribe(() => {
        this.documentListChangedEvent.next(this.documents.slice());
      });
  }
}
