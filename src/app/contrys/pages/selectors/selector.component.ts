import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { switchMap, tap } from 'rxjs/operators'

import { ContryService } from '../../services/contry.service';
import { CountriesSmall, Countries } from '../../interfaces/contry.interface';

@Component({
  
  selector: 'app-selector',
  
  templateUrl: './selector.component.html',
  
  styles: [
  ]

})

export class SelectorComponent implements OnInit{

  myForm: FormGroup = this.form.group({

    region: [ '',Validators.required ],
    countries: [ '',Validators.required ],
    borders: [ '',Validators.required ]
  });

  //Full Selectors
  
  regions: string[] = [];
  countries: CountriesSmall[] = [];
  borders: CountriesSmall[] = [];

  //UI

  loading: boolean = false;

  constructor( private form: FormBuilder, private countryService: ContryService ) { }

  ngOnInit(): void {
    
    this.regions = this.countryService.getRegions

    //Cuando Cambie la Region

    this.myForm.get( 'region' )?.valueChanges
    .pipe(
      tap( ( _ ) => { 
        this.myForm.get( 'countries' )?.reset('');
        this.loading = true; 
      } ),
      switchMap( region => this.countryService.getCountriesByRegion( region ) )
    )
    .subscribe( countries => {
      this.countries = countries;
      this.loading = false; 
    } );

    //Cuando Cambie el Pais

    this.myForm.get( 'countries' )?.valueChanges
    .pipe(
      tap( () => {
        //this.borders = [];
        this.myForm.get('borders')?.reset('');
        this.loading = true;
      } ),
      switchMap( (code: string) => this.countryService.getCountryByCode( code ) ),

      switchMap( country => this.countryService.getBordersCountry( country?.borders! ) )
    )
    .subscribe( countries => {

      this.borders = countries;

      console.log(this.borders);
      
      this.loading = false;
    
    } );
    
  }

  guardar() { console.log( this.myForm.value ); }

}
