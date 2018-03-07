import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import {ChartService} from './services/echarts.service';
import {Chart} from './models/chart';
import {Subject} from '../../tables/contents/models/subject';
import {Book} from '../../tables/contents/models/book';

@Component({
  selector: 'ngx-echarts-bar',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
  providers: [ChartService],
})
export class EchartsBarComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  getSubject: Subject[] = new Array();
    getBook: Book[] = new Array();
  url;

  constructor(private theme: NbThemeService, private chartService: ChartService) {
  }
  chart: Chart;
  getData() {
  this.url = localStorage.getItem('url');
  console.log('bar', this.url);
  this.chartService.getChart(this.url).subscribe(data => {
    this.chart = new Chart(data);
    // this.data(this.chart);
    console.log('chart', this.chart);
  });
  console.log('chart1', this.chart);
}
  ngAfterViewInit() {
    this.getData();
    setTimeout(() => {
    console.log('chart2', this.chart.Values);
    // this.name = this.chart.chart_name;
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.chart.chart_categories,
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: this.chart.labels[1],
            type: 'bar',
            barWidth: '60%',
            data: this.chart.Values,
          },
        ],
      };
    }); } , 500);
  }


  ngOnDestroy(): void {
    localStorage.removeItem('url');
    this.themeSubscription.unsubscribe();
  }
}
