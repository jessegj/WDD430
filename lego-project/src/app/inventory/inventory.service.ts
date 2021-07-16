import { Injectable, EventEmitter } from '@angular/core';
import { Inventory } from './inventory.model';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventories: Inventory[] = [];

  constructor() { }

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


}


