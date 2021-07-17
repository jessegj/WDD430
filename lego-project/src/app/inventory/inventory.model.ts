export class Inventory {
  [x: string]: any;
  constructor (
    public color: string,
    public size: string,
    public name: string,
    public id: any,
    public group: Inventory[] | any
  ){}
}
