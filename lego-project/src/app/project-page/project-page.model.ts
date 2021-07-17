export class ProjectPage {
  constructor (
    public description: string,
    public name: string,
    specialPieces: string,
    public id: any,
    public group: ProjectPage[] | any
  ){}
}
