import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CountryListComponent } from './country-list/country-list.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';
import { CountryService } from './services/country.service';

@Component({
  providers: [CountryService],
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CountryListComponent, DashboardChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'case-rio-analytics-app';

  ngOnInit(): void {}
}
