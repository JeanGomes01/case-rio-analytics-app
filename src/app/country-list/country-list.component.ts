import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Color, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { LucideAngularModule, Search } from 'lucide-angular';
import { CountryStoreService } from '../services/country-store.service';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormsModule, LucideAngularModule],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  @Input() countries: any[] | null = [];

  readonly Search = Search;
  // currentPage: number = 1;
  // itemsPerPage: number = 5; //Mostrar 5 países por vez
  // maxVisiblePages: number = 50; // Exibir apenas 5 países por página
  // totalPages: number = 0;
  // searchTerm: string = '';

  view: [number, number] = [500, 300];
  single: any[] = [];
  colorScheme: Color = {
    name: 'cool',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#4961e1', '#2c0eae', '#f44336', '#ffb74d', '#00aaff'],
  };

  constructor(private countryStoreService: CountryStoreService) {}

  ngOnInit(): void {
    // // Carregar países na inicialização
    // this.countryStoreService.getCountries().subscribe((data) => {
    //   this.countries = data.sort((a: any, b: any) =>
    //     a.name.common.localeCompare(b.name.common)
    //   );
    //   this.updateChartsAndPagination();
    // });
  }

  // updateChartsAndPagination() {
  //   this.totalPages = Math.ceil(
  //     this.filteredCountries.length / this.itemsPerPage
  //   );
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   const endIndex = startIndex + this.itemsPerPage;

  //   const visibleCountries = this.filteredCountries.slice(startIndex, endIndex);
  //   this.single = visibleCountries.map((country) => ({
  //     name: country.name.common,
  //     value: country.population,
  //   }));

  //   this.countryStoreService.updateChartData(this.single);
  //   console.log('Dados do gráfico:', this.single); // Adicione esta linha
  // }

  // onPageChange() {
  //   // Atualiza a tabela de acordo com a página selecionada
  //   this.updateChartsAndPagination();
  // }

  // get paginatedCountries() {
  //   const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  //   return this.filteredCountries.slice(
  //     startIndex,
  //     startIndex + this.itemsPerPage
  //   );
  // }

  // getLimitedPages() {
  //   const pages = [];
  //   for (
  //     let i = 1;
  //     i <= Math.ceil(this.filteredCountries.length / this.itemsPerPage);
  //     i++
  //   ) {
  //     pages.push(i);
  //   }
  //   return pages.slice(0, this.maxVisiblePages);
  // }

  // prevPage() {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //   }
  // }

  // nextPage() {
  //   if (this.currentPage < this.totalPages) {
  //     this.currentPage++;
  //   }
  // }

  // setPage(page: number) {
  //   this.currentPage = page;
  //   this.updateChartsAndPagination(); // Adicione esta linha
  // }
}
