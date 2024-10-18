import { Component, OnInit } from '@angular/core';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './dashboard-chart.component.html',
  styleUrl: './dashboard-chart.component.scss',
})
export class DashboardChartComponent implements OnInit {
  countries: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  maxVisiblePages: number = 5;
  totalPages: number = 0;

  searchTerm: string = '';

  view: [number, number] = [500, 300];
  single: any[] = [];

  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4961e1', '#2c0eae', '#f44336', '#ffb74d', '#00aaff'],
  };
  constructor(private countryService: CountryService) {}

  ngOnInit(): void {
    this.countryService.getCountries().subscribe((data) => {
      this.countries = data.sort((a: any, b: any) =>
        a.name.common.localeCompare(b.name.common)
      );
      this.updateChartsAndPagination();
    });
  }

  get filteredCountries() {
    const matchedCountries = this.countries.filter((country) => {
      const countryNameMatches = country.name.common
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      // const capitalMatches =
      //   country.capital &&
      //   country.capital.toLowerCase().includes(this.searchTerm.toLowerCase());

      return countryNameMatches;
    });

    return matchedCountries.length > 0 ? matchedCountries : this.countries;
  }

  updateChartsAndPagination() {
    // Atualiza a total de páginas com base nos países filtrados
    this.totalPages = Math.ceil(
      this.filteredCountries.length / this.itemsPerPage
    );

    // Atualiza os dados do gráfico com base nos países filtrados
    this.single = this.filteredCountries.map((country) => ({
      name: country.name.common,
      value: country.population,
    }));
  }
}
