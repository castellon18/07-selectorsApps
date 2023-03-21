import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { combineLatest, map, Observable, of, retry } from 'rxjs';
import { CountriesSmall, Countries } from '../interfaces/contry.interface';

@Injectable({
  
  providedIn: 'root'

})

export class ContryService {

  private baseUrl: string = 'https://restcountries.com/v3.1';

  private _regions: string[] = [ 'africa', 'americas', 'asia', 'europe', 'oceania' ];

  get getRegions(): string[] {
    
    return [ ...this._regions ]
  
  }

  constructor( private http: HttpClient ) { }

  // Get Countrys by Region(Paises por Region)

  getCountriesByRegion( region: string ): Observable< CountriesSmall[] > {

    const url: string = `${ this.baseUrl }/region/${ region }?fields=cca2,name`
    
    return this.http.get<CountriesSmall[] >( url );

  }

  // Get Countries by Code(Paises por Codigo)

  getCountryByCode( code: string ): Observable< Countries | null > {

    if( !code || code.length === 0 ) return of( null );

    const url: string = `${ this.baseUrl }/alpha?codes=${code}`;

    return this.http.get< Countries[] >( url ).pipe( map( country => country[0] ) );

  }

  // Get Small Countries by Region(Paises por Codigo usando la interface CountrySmall)

  getSmallCountryByCode( code: string ): Observable< CountriesSmall > {

    const url: string = `${ this.baseUrl }/alpha?codes=${code}&fields=cca2,name`;

    return this.http.get< CountriesSmall >( url );

  }

  getBordersCountry( borders: string[] ): Observable< CountriesSmall[] > {

    if( !borders ) {
      
      return of( [] )
    
    }

    const requests: Observable< CountriesSmall >[] = [];

    borders.forEach( code => {

      const request = this.getSmallCountryByCode(code);
      
      requests.push( request );
    
    } );

    return combineLatest( requests );

  }

}
