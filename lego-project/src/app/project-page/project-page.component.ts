import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription, Observable } from 'rxjs';
import { ProjectPage } from './project-page.model';
import { setTheme } from 'ngx-bootstrap/utils'
import { InventoryModalComponent } from '../inventory-modal/inventory-modal.component';
import { ProjectDataService } from '../services/project-data.service';
import { ActivatedRoute } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  //@Input() projectItem: ProjectPage;
  //@Output() projectItemChange: EventEmitter<ProjectPage> = new EventEmitter<ProjectPage>();
  @Input() projectItem: ProjectPage;
  
  constructor(private modalService: BsModalService, private dataService: ProjectDataService, private route: ActivatedRoute) {
    setTheme('bs3');
    this.projectItem = {items: []};
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log(params);
      if(params.id && params.id.length > 0) {
        this.dataService.getProject(params.id).subscribe(res => {
          this.projectItem = res;
        })
      }
    });
  }
  projectPageChange(projectItem: ProjectPage | any): void {
    this.projectItem = projectItem;
  }

  addItem(): void {
    let inventoryModal = this.modalService.show(InventoryModalComponent);
  
    inventoryModal.content?.inventoryChange.subscribe((inventory) => {
      this.projectItem.items?.push(inventory);
    });
    
  }
  saveProject(): void {
    if(!this.projectItem.startDate) {
      this.projectItem.startDate = new Date();
    }
    this.dataService.saveProject(this.projectItem);
  }
}