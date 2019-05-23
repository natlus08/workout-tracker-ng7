import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';

import { WorkoutService } from '../../services/workout.service';

import { Workout } from '../../model/workout';
import { Archive } from '../../model/archive';

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.css']
})
export class TrackComponent implements OnInit {

  private archives:Archive[] = [];

  private dataAvailable:boolean = true;

  private today:Date = new Date();

  private todaysWO:number = 0;

  private weeksWO:number = 0;

  private monthsWO:number = 0;

  private days:number = 0;

  private minutes:number = 0;

  private weekChartData: number[] = [];

  private monthChartData: number[] = [];

  private yearChartData: number[] = [];

  private sun: number = 0;
  private mon: number = 0;
  private tue: number = 0;
  private wed: number = 0;
  private thu: number = 0;
  private fri: number = 0;
  private sat: number = 0;

  private w1: number = 0;
  private w2: number = 0;
  private w3: number = 0;
  private w4: number = 0;
  private w5: number = 0;

  private jan: number = 0;
  private feb: number = 0;
  private mar: number = 0;
  private apr: number = 0;
  private may: number = 0;
  private jun: number = 0;
  private jul: number = 0;
  private aug: number = 0;
  private sep: number = 0;
  private oct: number = 0;
  private nov: number = 0;
  private dec: number = 0;

  private weekChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Workouts for this week'
    },
    xAxis: {
      categories: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Calories',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' calories'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true,
      enabled: false
    },
    credits: {
      enabled: false
    }
  });

  private monthChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Workouts for this Month'
    },
    xAxis: {
      categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Calories',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' calories'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true,
      enabled: false
    },
    credits: {
      enabled: false
    }
  });

  private yearChart = new Chart({
    chart: {
      type: 'column'
    },
    title: {
      text: 'Workouts for this year'
    },
    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      title: {
        text: null
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Calories',
        align: 'high'
      },
      labels: {
        overflow: 'justify'
      }
    },
    tooltip: {
      valueSuffix: ' calories'
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: false
        }
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'top',
      x: -40,
      y: 80,
      floating: true,
      borderWidth: 1,
      backgroundColor: '#FFFFFF',
      shadow: true,
      enabled: false
    },
    credits: {
      enabled: false
    }
  });


  constructor(private _workoutService: WorkoutService) { }

  ngOnInit() {
    this.dataAvailable = true;
    this.getArchives();
  }

  getArchives(): void{
    this._workoutService.getArchives().subscribe((data) => {
        if(data != null){
          this.archives = data;
          this.calculateWOMinutes();
          this.chartData();
        }else{
          this.dataAvailable = false;
        }
      }
    );
  }

  calculateWOMinutes(): void{
    var day = this.today.getDay();
    this.archives.forEach(archive => {
      this.days = Math.ceil((Math.abs(this.today.getTime() - archive.enddate.getTime())) / (1000 * 3600 * 24));
      this.minutes = Math.ceil((Math.abs(archive.enddate.getTime() - archive.startdate.getTime())) / (1000 * 60));
      if(this.days == 1){
        this.todaysWO = this.todaysWO + this.minutes;
      }
      if(this.days <= 7 && this.days <= day){
        this.weeksWO = this.weeksWO + this.minutes;
      }
      if(this.days <= 31 && (this.today.getMonth() === archive.enddate.getMonth())){
        this.monthsWO = this.monthsWO + this.minutes;
      }
    });
  }

  chartData(): void {
    var day = this.today.getDay();
    this.archives.forEach(archive => {
      this.days = Math.ceil((Math.abs(this.today.getTime() - archive.enddate.getTime())) / (1000 * 3600 * 24));
      if(this.days <= 7 && this.days <= day){
        if(this.days === 0){
          this.sun = this.sun + archive.calories;
        }else if(this.days === 1){
          this.mon = this.mon + archive.calories;
        }else if(this.days === 2){
          this.tue = this.tue + archive.calories;
        }else if(this.days === 3){
          this.wed = this.wed + archive.calories;
        }else if(this.days === 4){
          this.thu = this.thu + archive.calories;
        }else if(this.days === 5){
          this.fri = this.fri + archive.calories;
        }else if(this.days === 6){
          this.sat = this.sat + archive.calories;
        }
      }
      if(this.today.getFullYear() === archive.enddate.getFullYear()) {
        if (archive.enddate.getMonth() === 0) {
          this.jan = this.jan + archive.calories;
        } else if (archive.enddate.getMonth() === 1) {
          this.feb = this.feb + archive.calories;
        } else if (archive.enddate.getMonth() === 2) {
          this.mar = this.mar + archive.calories;
        } else if (archive.enddate.getMonth() === 3) {
          this.apr = this.apr + archive.calories;
        } else if (archive.enddate.getMonth() === 4) {
          this.may = this.may + archive.calories;
        } else if (archive.enddate.getMonth() === 5) {
          this.jun = this.jun + archive.calories;
        } else if (archive.enddate.getMonth() === 6) {
          this.jul = this.jul + archive.calories;
        } else if (archive.enddate.getMonth() === 7) {
          this.aug = this.aug + archive.calories;
        } else if (archive.enddate.getMonth() === 8) {
          this.sep = this.sep + archive.calories;
        } else if (archive.enddate.getMonth() === 9) {
          this.oct = this.oct + archive.calories;
        } else if (archive.enddate.getMonth() === 10) {
          this.nov = this.nov + archive.calories;
        } else if (archive.enddate.getMonth() === 11) {
          this.dec = this.dec + archive.calories;
        }
        if((this.days <= 31) && (this.today.getMonth() === archive.enddate.getMonth())) {
          var dayone = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
          let week = Math.ceil((Math.abs((archive.enddate.getTime() - dayone.getTime()) / 86400000) + dayone.getDay() + 1) / 7 );
          if (week === 1){
            this.w1 = this.w1 + archive.calories;
          }else if(week === 2){
            this.w2 = this.w2 + archive.calories;
          }else if(week === 3){
            this.w3 = this.w3 + archive.calories;
          }else if(week === 4){
            this.w4 = this.w4 + archive.calories;
          }else if(week === 5){
            this.w5 = this.w5 + archive.calories;
          }
        }
      }
    });

    this.weekChartData.push(this.sun);
    this.weekChartData.push(this.mon);
    this.weekChartData.push(this.tue);
    this.weekChartData.push(this.wed);
    this.weekChartData.push(this.thu);
    this.weekChartData.push(this.fri);
    this.weekChartData.push(this.sat);


    this.yearChartData.push(this.jan);
    this.yearChartData.push(this.feb);
    this.yearChartData.push(this.mar);
    this.yearChartData.push(this.apr);
    this.yearChartData.push(this.may);
    this.yearChartData.push(this.jun);
    this.yearChartData.push(this.jul);
    this.yearChartData.push(this.aug);
    this.yearChartData.push(this.sep);
    this.yearChartData.push(this.oct);
    this.yearChartData.push(this.nov);
    this.yearChartData.push(this.dec);

    this.monthChartData.push(this.w1);
    this.monthChartData.push(this.w2);
    this.monthChartData.push(this.w3);
    this.monthChartData.push(this.w4);
    this.monthChartData.push(this.w5);

    this.weekChart.addSeries({
      name: 'workouts',
      data: this.weekChartData
    }, true, true);
    this.monthChart.addSeries({
      name: 'workouts',
      data: this.monthChartData
    }, true, true);
    this.yearChart.addSeries({
      name: 'workouts',
      data: this.yearChartData
    },true, true);
  }  
}