import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {

  constructor() { }

  public chartType: string = 'pie';
  @Input() chartDatasets: any;
  @Input() chartLabels: any;

  public chartOptions: any = {
    responsive: true,
    legend: {
      labels: {
        fontFamily: 'avenir'
      }
    },
  };

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(63, 81, 181, 1)',
        'rgba(77, 182, 172, 1)',
        'rgba(66, 133, 244, 1)',
        'rgba(156, 39, 176, 1)',
        'rgba(233, 30, 99, 1)',
        '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360',],

      hoverBackgroundColor: [
        'rgba(63, 81, 181, 0.5)',
        'rgba(77, 182, 172, 0.5)',
        'rgba(66, 133, 244, 0.5)',
        'rgba(156, 39, 176, 0.5)',
        'rgba(233, 30, 99, 0.5)',
        '#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360',],
      borderWidth: 2,
    }
  ];
}
