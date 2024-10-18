import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { LucideAngularModule, Search } from 'lucide-angular';
import { CountryService } from '../services/country.service';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormsModule, LucideAngularModule],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  readonly Search = Search;

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

  get paginatedCountries() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredCountries.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }

  getLimitedPages() {
    const pages = [];
    for (
      let i = 1;
      i <= Math.ceil(this.filteredCountries.length / this.itemsPerPage);
      i++
    ) {
      pages.push(i);
    }
    return pages.slice(0, this.maxVisiblePages);
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  setPage(page: number) {
    this.currentPage = page;
  }
}
