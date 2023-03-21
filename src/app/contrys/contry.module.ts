import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ContryRoutingModule } from './contry-routing.module';
import { SelectorComponent } from './pages/selectors/selector.component';


@NgModule({
  
  declarations: [
    SelectorComponent
  ],

  imports: [
    CommonModule,
    ContryRoutingModule,
    ReactiveFormsModule
  ]

})

export class ContryModule { }
