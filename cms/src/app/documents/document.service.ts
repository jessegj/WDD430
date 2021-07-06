import { Injectable, EventEmitter } from '@angular/core';
import { DocumentModel } from './document.model';
//import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
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
      .get<DocumentModel[]>('http://localhost:3000/documents')
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
  addDocument(document: DocumentModel) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: DocumentModel }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.documents.sort((a, b) => (a.id < b.id ? 1 : 0));
        }
      );
  }
  updateDocument(originalDocument: DocumentModel, newDocument: DocumentModel) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response | any) => {
          this.documents[pos] = newDocument;
          this.documents.sort((a, b) => (a.id < b.id ? 1 : 0));
        }
      );
  }
  deleteDocument(document: DocumentModel) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response | any) => {
          this.documents.splice(pos, 1);
          this.documents.sort((a, b) => (a.id < b.id ? 1 : 0));
        }
      );
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
