import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ProjectPage } from './project-page.model';
import { setTheme } from 'ngx-bootstrap/utils'
import { InventoryModalComponent } from '../inventory-modal/inventory-modal.component';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  @Input() projectItem: ProjectPage;
  @Output() projectItemChange: EventEmitter<ProjectPage> = new EventEmitter<ProjectPage>();

  constructor(private modalService: BsModalService) {
    setTheme('bs3');
  }

  ngOnInit(): void {
    if(!this.projectItem){
      this.projectItem = new ProjectPage();
    }
  }
  projectPageChange(projectItem: ProjectPage | any): void {
    this.projectItem = projectItem;
    console.log(this.projectItem);
  }
  formChange(): void {
    this.projectItemChange.emit(this.projectItem);
  }

  addItem(): void {
    let inventoryModal = this.modalService.show(InventoryModalComponent);
  }

}
