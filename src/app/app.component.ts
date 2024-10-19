import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { CountryListComponent } from './country-list/country-list.component';
import { DashboardChartComponent } from './dashboard-chart/dashboard-chart.component';
import { CountryStoreService } from './services/country-store.service';
import { CountryService } from './services/country.service';

@Component({
  providers: [CountryService, CountryStoreService],
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CountryListComponent,
    DashboardChartComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'case-rio-analytics-app';
  countries$: Observable<any[]>;
  regions$: Observable<string[]>;
  subregions$: Observable<string[]>;

  constructor(
    private countryService: CountryService,
    private countryStoresService: CountryStoreService
  ) {}

  ngOnInit(): void {
    this.listCountries();
    this.listRegions();
    this.listSubRegions();
  }

  listCountries(): void {
    this.countries$ = this.countryService.getCountries();
  }

  listRegions(): void {
    this.regions$ = this.countryService.getRegions();
  }

  listSubRegions(): void {
    this.subregions$ = this.countryService.getSubRegions();
  }

  selectRegion(): void {
    console.log('Region');
  }
  selectSubRegion(): void {
    console.log('SubRegion');
  }

  // filterCountries(): void {
  //   const matchedCountries = this.countries.filter((country) => {
  //     const countryNameMatches = country.name.common
  //       .toLowerCase()
  //       .includes(this.searchTerm.toLowerCase());

  //     const capitalMatches =
  //       country.capital &&
  //       country.capital.toLowerCase().includes(this.searchTerm.toLowerCase());

  //     return countryNameMatches;
  //   });

  //   return matchedCountries.length > 0 ? matchedCountries : this.countries;
  // }
}
