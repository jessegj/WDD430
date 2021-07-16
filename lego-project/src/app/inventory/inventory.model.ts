export class Inventory {
  constructor (
    public color: string,
    public size: string,
    public name: string,
    public id: string,
    public group: Inventory[] | any
  ){}
}
