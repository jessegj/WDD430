export class ProjectPage {
  constructor (
    public name: string,
    public description: string,
    public startDate: Date,
    public endDate: Date,
    public image: string,
    public id: any,
    public group: ProjectPage[] | any
  ){}
}
