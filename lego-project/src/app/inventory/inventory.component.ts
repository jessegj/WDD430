import { Component, OnInit } from '@angular/core';
import { Inventory } from './inventory.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {

  inventories: Inventory[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
