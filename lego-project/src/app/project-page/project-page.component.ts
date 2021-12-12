import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ProjectPage } from './project-page.model';
import { setTheme } from 'ngx-bootstrap/utils'
import { InventoryModalComponent } from '../inventory-modal/inventory-modal.component';
import { ProjectDataService } from '../services/project-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Inventory } from '../inventory/inventory.model';
import { v4 as uuidV4 } from 'uuid';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  //@Input() projectItem: ProjectPage;
  //@Output() projectItemChange: EventEmitter<ProjectPage> = new EventEmitter<ProjectPage>();
  projectItem = new ProjectPage();
  backupProjectItem = new ProjectPage();
  
  constructor(private modalService: BsModalService, private dataService: ProjectDataService, private route: ActivatedRoute, private router: Router) {
    setTheme('bs3');
    this.projectItem.items = [];
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if(params.id && params.id.length > 0) {
        this.dataService.getProject(params.id).subscribe(res => {
          this.projectItem = res ?? new ProjectPage();
        })
      } 
    });
  }
  addItem(): void {
    let inventoryModal = this.modalService.show(InventoryModalComponent);
  
    inventoryModal.content?.inventoryChange.subscribe((inventory) => {
      inventory.id = uuidV4();
      this.projectItem.items?.push(inventory);
    }); 
  }
  editItem(item: Inventory): void {
    const modalOptions: ModalOptions<InventoryModalComponent> = {
      initialState: {
        inventory: item
      }
    }
  let inventoryModal = this.modalService.show(InventoryModalComponent, modalOptions);
  
    inventoryModal.content?.inventoryChange.subscribe((inventory) => {
      let index = this.projectItem.items!.indexOf(item);
      this.projectItem.items![index] = inventory;
    });
    inventoryModal.content?.inventoryDelete.subscribe(() => {
      let index = this.projectItem.items!.indexOf(item);
      this.projectItem.items!.splice(index, 1);
    });
  }
  saveProject(): void {
    if(!this.projectItem.startDate) {
      this.projectItem.startDate = new Date();
    }
    this.dataService.saveProject(this.projectItem);
    this.router.navigate(['/project-list']);
  }
  cancelButton() {
    this.router.navigate(['/project-list']);
  }
}