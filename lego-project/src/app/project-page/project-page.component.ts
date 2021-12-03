import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Subscription, Observable } from 'rxjs';
import { ProjectPage } from './project-page.model';
import { setTheme } from 'ngx-bootstrap/utils'
import { InventoryModalComponent } from '../inventory-modal/inventory-modal.component';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { addDoc } from '@firebase/firestore';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  //@Input() projectItem: ProjectPage;
  //@Output() projectItemChange: EventEmitter<ProjectPage> = new EventEmitter<ProjectPage>();
  projectItem: ProjectPage;
  
  constructor(private modalService: BsModalService, private firestore: Firestore) {
    setTheme('bs3');
    this.projectItem = {  name: "test name",
     description: "test description",
     startDate: new Date(),
     endDate: new Date()
    };
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

  addItem(): void {
    let inventoryModal = this.modalService.show(InventoryModalComponent);
  }
  saveProject(): void {
    const projectRef = collection(this.firestore, 'project');
    addDoc(projectRef, this.projectItem);
    console.log("save", this.projectItem)
  }

}
