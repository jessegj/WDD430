export class ContactModel{

  constructor(
    public id: any,
    public name: string,
    public email: string,
    public phone: string,
    public imageUrl: string,
    public group:ContactModel[] | any
  ){}
}

    // constructor(id:string, name:string, email:string, phone:string, imageUrl:string, group:any)
    // {
    //   this.id = id;
    //   this.name = name;
    //   this.email = email;
    //   this.phone = phone;
    //   this.imageUrl = imageUrl;
    //   this.group = group;
    // }

