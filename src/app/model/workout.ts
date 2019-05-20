export class Workout {
  constructor(
    public title: string,
    public note: string,
    public calories: number,
    public category: string,
    public startdate: Date,
    public enddate: Date,
    public starttime: Date,
    public endtime: Date,
    public started: boolean
  ) {  }
}