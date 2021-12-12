
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
}


