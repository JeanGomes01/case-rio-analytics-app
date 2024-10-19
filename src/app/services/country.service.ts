import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class CountryService {
  private jsonUrl = 'http://localhost:3000/countries';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }

  getRegions(): Observable<string[]> {
    return this.http.get<string[]>(this.jsonUrl).pipe(
      map((countries) => {
        return countries.reduce((regions: string[], country: any) => {
          const region = regions.find((region) => region === country.region);

          if (!region) {
            regions.push(country.region);
          }
          return regions;
        }, []);
      })
    );
  }

  getSubRegions(): Observable<string[]> {
    return this.http.get<string[]>(this.jsonUrl).pipe(
      map((countries) => {
        return countries
          .reduce((subregions: string[], country: any) => {
            const subregion = subregions.find(
              (subregion) => subregion === country.subregion
            );

            if (!subregion) {
              subregions.push(country.subregion);
            }
            return subregions;
          }, [])
          .filter(Boolean);
      })
    );
  }
}
