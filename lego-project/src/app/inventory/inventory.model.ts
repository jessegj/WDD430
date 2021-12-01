export class Inventory {
  [x: string]: any;
  constructor (
    public color?: string,
    public size?: string,
    public name?: string,
    public description?: string,
    public partNumber?: string,
    public quantity?: number,
    public group?: Inventory[] | any
  ){}
}
