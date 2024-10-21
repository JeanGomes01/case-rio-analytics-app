import { Component, Input, OnInit } from '@angular/core';
import {
  Color,
  LegendPosition,
  NgxChartsModule,
  ScaleType,
} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
})
export class DashboardChartComponent implements OnInit {
  @Input() set setData(data: {
    countries: any[] | null;
    itemsPerPage: number;
    currentPage: number;
  }) {
    if (!data.countries?.length) {
      return;
    }
    this.single = this.getItemsToShow(
      data.countries,
      data.itemsPerPage,
      data.currentPage
    ).map((country) => ({
      name: country.name.common,
      value: country.population,
    }));
  }

  isMobile: boolean = false;

  itemsPerPage: number = 5;

  countries: any[] = [];
  single: any[] = [];

  LegendPosition: LegendPosition.Right;

  colorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [],
  };

  constructor() {}

  ngOnInit(): void {
    this.isMobile = window.innerWidth <= 600;
  }

  getItemsToShow(
    countries: any,
    itemsPerPage: number,
    currentPage: number = 1
  ): any[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return countries.slice(startIndex, endIndex);
  }
}
