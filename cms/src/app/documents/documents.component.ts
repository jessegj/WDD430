import { Component, OnInit } from '@angular/core';
import { DocumentModel } from './document.model';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {

  selectedDocument:DocumentModel;

  constructor() { }

  ngOnInit(): void {
  }

}
