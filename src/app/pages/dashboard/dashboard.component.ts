import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  chartDatasets: Array<any> = [
    { data: [], label: 'Sectors Feelings' }
  ];

  chartLabels: Array<any> = [];
  topSectors: any[] = [];
  availableSectorsNumber = 0;
  assignedSectorsNumber = 0;

  ngOnInit(): void {
    this.getChartData();
    this.availableSectorsNumber = Number(JSON.parse(localStorage.getItem('sectorsFromAPI') || '[]').length);
  }

  getChartData(): void {
    const pieChartData: any[] = JSON.parse(localStorage.getItem('rows') || '[]');
    this.assignedSectorsNumber = pieChartData.length;
    if (pieChartData.length > 0) {
      pieChartData.forEach((element: any) => {
        this.chartDatasets[0].data.push(element.co2);
        this.chartLabels.push(`${element.sector} ${element.feeling}`);
      });
      this.topSectors = pieChartData.sort(function (a, b) {
        return a.co2 - b.co2
      });
      this.topSectors.splice(3);
    }
  }
}
