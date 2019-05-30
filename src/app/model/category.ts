export class Category {
  
  public name: string;
  public id: string;

  constructor(name: string, id?: string) {     
    this.id = id;
    this.name = name;
  }  
}