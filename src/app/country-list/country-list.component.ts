import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LucideAngularModule, Search } from 'lucide-angular';

@Component({
  selector: 'app-country-list',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormsModule, LucideAngularModule],
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss'],
})
export class CountryListComponent implements OnInit {
  @Input() set setCountries(countries: any[] | null) {
    if (!countries?.length) {
      return;
    }
    const _countries = countries;

    this.countriesQuantity = _countries.length;
    this.totalPages = _countries.length / this.itemsPerPage;
    this.pages = Array.from(
      { length: this.totalPages },
      (_, index) => index + 1
    );
    this.countries = this.getItemsToShow(
      _countries,
      this.itemsPerPage,
      this.currentPage
    );
  }
  @Output() searchTermEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() currentPageEvent: EventEmitter<number> = new EventEmitter<number>();

  countriesQuantity: number = 0;
  pages: number[] = [];
  totalPages: number = 0;
  itemsPerPage: number = 5;
  currentPage: number = 1;

  countries: any[] = [];
  readonly Search = Search;

  constructor() {}

  ngOnInit(): void {}

  filterCountries(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTermEvent.emit(target.value);
  }

  getItemsToShow(
    countries: any,
    itemsPerPage: number,
    currentPage: number
  ): any[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return countries.slice(startIndex, endIndex);
  }

  selectPage(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.currentPage = Number(select.value);
    this.currentPageEvent.emit(this.currentPage);
  }
}
