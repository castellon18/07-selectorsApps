import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path:'pages',
    loadChildren: () => import( './contrys/contry.module' ).then( m => m.ContryModule )
  }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]

})

export class AppRoutingModule { }
