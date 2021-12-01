import { Component, OnInit } from '@angular/core';
import { Inventory } from '../inventory/inventory.model';

@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.component.html',
  styleUrls: ['./inventory-modal.component.css']
})
export class InventoryModalComponent implements OnInit {
  inventory: Inventory;

  constructor() { }

  ngOnInit(): void {
  }
  inventoryChange(inventory: Inventory): void {
    this.inventory = inventory;
    console.log(this.inventory);
  }
}
