import { Injectable, EventEmitter } from '@angular/core';
import { Inventory } from './inventory.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  inventories: Inventory[] = [];
  maxInventoryId: number | any;

  inventorySelectedEvent = new EventEmitter<Inventory>();
  inventoryChangedEvent = new Subject<Inventory[]>();
  inventoryListChangedEvent = new Subject<Inventory[]>();

  constructor() {
    this.maxInventoryId = this.getMaxId();
  }

  getPieces(): Inventory[] {
    return this.inventories;
  }

  getPiece(id: string): Inventory | null {
    for (let inventory of this.inventories) {
      if (inventory.id == id) {
        return inventory;
      }
    }
    return null;
  }

  getMaxId() {
    let maxId = 0;

    for (let inventory of this.inventories) {
      let currentId = parseInt(inventory.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }
  addPiece(newPiece: Inventory | any) {
    if (!newPiece) {
      return;
    }
    this.maxInventoryId++;
    newPiece.id = this.maxInventoryId;
    newPiece.push(this.inventories);
    let inventoryListClone = this.inventories.slice();
    this.inventoryListChangedEvent.next(inventoryListClone);
  }

  updateInventory(originalPiece: Inventory, newPiece: Inventory) {
    if (!originalPiece || !newPiece) {
      return;
    }

    let pos = this.inventories.indexOf(originalPiece);
    if (pos < 0) {
      return;
    }

    newPiece.id = originalPiece.id;
    this.inventories[pos] = newPiece;
    let inventoriesListClone = this.inventories.slice();
    this.inventoryListChangedEvent.next(inventoriesListClone);
  }

  deletePiece(inventory: Inventory) {
    if (!inventory) {
      return;
    }

    let pos = this.inventories.indexOf(inventory);
    if (pos < 0) {
      return;
    }
    this.inventories.splice(pos, 1);
    let inventoriesListClone = this.inventories.slice();
    this.inventoryListChangedEvent.next(inventoriesListClone);
  }
}
