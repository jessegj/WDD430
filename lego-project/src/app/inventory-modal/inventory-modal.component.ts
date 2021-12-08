import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Inventory } from '../inventory/inventory.model';

@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.component.html',
  styleUrls: ['./inventory-modal.component.css']
})
export class InventoryModalComponent implements OnInit {
  @Output() inventoryChange = new EventEmitter<Inventory>();
  inventory: Inventory;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }
  onInventoryChange(inventory: Inventory): void {
    this.inventory = inventory;
  }
  saveButton(){
    this.inventoryChange.emit(this.inventory);
    this.bsModalRef.hide();
  }
  cancelButton(){
    this.bsModalRef.hide();
  }
}
