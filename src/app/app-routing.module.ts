import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes :   Routes = [
  { path: 'home', component: HomeComponent },
  // {path : '', redirectTo : '/list', pathMatch : 'full' } 
  // redirect to the home route if the client side route path is empty
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // wild card route
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes) 
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
