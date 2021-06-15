import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DocumentModel } from '../document.model';
import { DocumentService } from '../document.service';

@Component({
  selector: 'app-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css'],
})
export class DocumentEditComponent implements OnInit {
  originalDocument: DocumentModel | any;
  document: DocumentModel;
  editMode: boolean = false;
  id: string;
  constructor(
    private documentService: DocumentService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    if (!this.id) {
      this.editMode = false;
      return;
    }

    this.originalDocument = this.documentService.getDocument(this.id);

    if (!this.originalDocument) {
      return;
    }
    this.editMode = true;
    this.document = JSON.parse(JSON.stringify(this.originalDocument));
  }
  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new DocumentModel(
      this.id,
      value.name,
      value.description,
      value.url,
      value.children
    );

    if (this.editMode === true) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }
    this.router.navigate(['/documents']);
  }
  onCancel() {
    this.router.navigate(['/documents']);
  }
}
