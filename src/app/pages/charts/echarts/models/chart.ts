export class Chart {
    chart_name: string;
    labels: string[];
    chart_categories: string[];
    Values: number[];

     constructor(data: any) {
         this.chart_name = data.chart_name;
         this.labels = data.labels;
         this.chart_categories = data.chart_categories;
         this.Values = data.Values;
     }
}
