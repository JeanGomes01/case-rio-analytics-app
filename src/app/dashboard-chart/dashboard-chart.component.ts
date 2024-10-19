import { Component, OnInit } from '@angular/core';
import {
  Color,
  LegendPosition,
  NgxChartsModule,
  ScaleType,
} from '@swimlane/ngx-charts';
import { CountryStoreService } from '../services/country-store.service';

@Component({
  selector: 'app-dashboard-chart',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.scss'],
})
export class DashboardChartComponent implements OnInit {
  countries: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5; // Número de países por página
  totalPages: number = 0;
  searchTerm: string = '';

  single: any[] = [];
  legendPosition: LegendPosition = LegendPosition.Below;

  colorScheme: Color = {
    name: 'vivid',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [], // Defina as cores conforme necessário
  };

  constructor(private countryStoreService: CountryStoreService) {}

  ngOnInit(): void {
    this.countryStoreService.getCountries().subscribe((data) => {
      console.log('Dados recebidos no componente:', data); // Adicione esta linha
      this.countries = data.sort((a: any, b: any) =>
        a.name.common.localeCompare(b.name.common)
      );
      this.updateChartsAndPagination();
    });

    this.countryStoreService.chartData$.subscribe((data) => {
      this.single = data;
      console.log('Dados do gráfico atualizados', this.single);
    });
  }

  get filteredCountries() {
    return this.countries.filter((country) =>
      country.name.common.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  updateChartsAndPagination() {
    this.totalPages = Math.ceil(
      this.filteredCountries.length / this.itemsPerPage
    );
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;

    const visibleCountries = this.filteredCountries.slice(startIndex, endIndex);
    this.single = visibleCountries.map((country) => ({
      name: country.name.common,
      value: country.population,
    }));

    console.log(this.single); // Adicione isso para depuração
  }

  setPage(page: number) {
    this.currentPage = page;
    console.log('Mudou para a página:', page); // Adicione esta linha
    this.updateChartsAndPagination();
  }
}
