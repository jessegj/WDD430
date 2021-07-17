import { Component, OnInit } from '@angular/core';
import { Inventory } from './inventory.model';
import { InventoryService } from './inventory.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  term!: string;
  onSelected(inventory: Inventory) {
    this.inventoryService.inventorySelectedEvent.emit(inventory);
  }

  inventories: Inventory[] = [];
  subscription: Subscription | any;
  constructor(private inventoryService: InventoryService) {}

  ngOnInit(): void {
    this.inventories = this.inventoryService.getPieces();
    this.inventoryService.inventoryChangedEvent.subscribe(
      (inventories: Inventory[]) => {
        this.inventories = inventories;
      }
    );
    this.subscription = this.inventoryService.inventoryListChangedEvent.subscribe(
      (inventoryList: Inventory[]) => {
        this.inventories = inventoryList;
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  search(value: string) {
    this.term = value;
  }

}
