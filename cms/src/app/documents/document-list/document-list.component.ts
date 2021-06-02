import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DocumentModel } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  documents: DocumentModel[] = [];
  subscription: Subscription | any;

  constructor(private document: DocumentService) {}

  ngOnInit(): void {
    this.documents = this.document.getDocuments();

    this.document.documentChangedEvent.subscribe(
      (documents: DocumentModel[]) => {
        this.documents = documents;
      }
    );
    this.subscription = this.document.documentListChangedEvent.subscribe(
      (documentList: DocumentModel[]) => {
        this.documents = documentList;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
