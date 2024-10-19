import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CountryService } from './country.service';

@Injectable()
export class CountryStoreService {
  countries$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  chartData$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]); // Corrigido

  constructor(private countryService: CountryService) {
    this.loadCountries();
  }

  loadCountries() {
    this.countryService.getCountries().subscribe((data) => {
      this.countries$.next(data);
    });
  }

  getCountries() {
    return this.countries$.asObservable();
  }

  updateChartData(data: any[]) {
    this.chartData$.next(data); // Emita novos dados para o gráfico
  }
}
