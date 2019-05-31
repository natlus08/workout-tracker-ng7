import { Category } from './category';

export class Workout {
  public id: string;
  public title: string;
  public note: string;
  public caloriesBurnt: number;
  public category: Category;
  
  constructor(title: string, note: string, caloriesBurnt: number, category: Category, id?: string) {
    this.id = id;
    this.title = title;
    this.note = note;
    this.caloriesBurnt = caloriesBurnt;
    this.category = category;
  }

}