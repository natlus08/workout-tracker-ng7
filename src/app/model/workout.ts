import { Category } from './category';

export class Workout {
  constructor(id: number, title: string, note: string, caloriesBurnt: number, category: Category) { }
  public id: number;
  public title: string;
  public note: string;
  public caloriesBurnt: number;
  public category: Category;
}