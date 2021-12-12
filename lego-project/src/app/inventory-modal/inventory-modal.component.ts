import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Inventory } from '../inventory/inventory.model';

@Component({
  selector: 'app-inventory-modal',
  templateUrl: './inventory-modal.component.html',
  styleUrls: ['./inventory-modal.component.css']
})
export class InventoryModalComponent implements OnInit {
  @Output() inventoryChange = new EventEmitter<Inventory>();
  @Output() inventoryDelete = new EventEmitter<Inventory>();
  @Input() inventory: Inventory;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    if(!this.inventory) {
      this.inventory = new Inventory();
    }
  }
  onInventoryChange(inventory: Inventory): void {
    this.inventory = inventory;
  }
  saveButton() {
    this.inventoryChange.emit(this.inventory);
    this.bsModalRef.hide();
  }
  cancelButton() {
    this.bsModalRef.hide();
  }

  deleteButton() {
    this.inventoryDelete.emit(this.inventory);
    this.bsModalRef.hide();
  }
}
