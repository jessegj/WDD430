import { Injectable, EventEmitter } from '@angular/core';
import { Inventory } from './inventory.model';


@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  inventories: Inventory[] = [];

  constructor() { }
}


