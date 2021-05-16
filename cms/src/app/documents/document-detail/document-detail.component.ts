import { Component, OnInit,Input } from '@angular/core';
import { DocumentModel } from '../document.model';

@Component({
  selector: 'app-document-detail',
  templateUrl: './document-detail.component.html',
  styleUrls: ['./document-detail.component.css']
})
export class DocumentDetailComponent implements OnInit {

  @Input() document: DocumentModel | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
