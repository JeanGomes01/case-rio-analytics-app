import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CountryListComponent } from './country-list/country-list.component';
import { CountryStoreService } from './services/country-store.service';
import { CountryService } from './services/country.service';

@Component({
  providers: [CountryService, CountryStoreService],
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CountryListComponent,
    // DashboardChartComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'case-rio-analytics-app';
  countries$: Observable<any[]>;

  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.listCountries();
  }

  listCountries(searchTerm?: string): void {
    this.countries$ = this.countryService.getCountries().pipe(
      map((countries) => {
        if (!searchTerm) {
          return this.sortCountries(countries);
        }
        return this.sortCountries(countries).filter((country: any) => {
          const countryNameMatches = country.name.common
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

          // const capitalMatches =
          //   country.capital &&
          //   country.capital.toLowerCase().includes(searchTerm.toLowerCase());

          return countryNameMatches;
        });
      })
    );
  }

  sortCountries(countries: any[]): any {
    return countries.sort((a: any, b: any) => {
      if (a.name.common < b.name.common) {
        return -1;
      }
      if (a.name.common > b.name.common) {
        return 1;
      }
      return 0;
    });
  }

  filterCountries(searchTerm?: string): void {
    this.listCountries(searchTerm);
  }
}
