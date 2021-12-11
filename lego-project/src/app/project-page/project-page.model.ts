
import { Inventory } from "../inventory/inventory.model";

export class ProjectPage {
    public name?: string;
    public description?: string;
    public startDate?: Date;
    public endDate?: Date;
    public image?: string;
    public status?: string;
    public id?: any;
    public items?: Inventory[];

    constructor(id:string, name:string, description: string, startDate: Date, endDate: Date, image: string, status: string, items: Inventory[])
  {
    this.id = id;
    this.name = name;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.image = image;
    this.status = status;
    this.items = items;
  }
}


