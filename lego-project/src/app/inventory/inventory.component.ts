import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Inventory } from './inventory.model';
import { InventoryService } from './inventory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
@Input() inventory: Inventory;
@Output() inventoryChange: EventEmitter<Inventory> = new EventEmitter<Inventory>();


  ngOnInit(): void {
    if(!this.inventory){
      this.inventory = new Inventory();
    }
  }

  formChange(): void {
    this.inventoryChange.emit(this.inventory);
  }
}
