import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { CustomPreloadingService } from './custom-preloading.service';

const appRoutes :   Routes = [
  { path: 'home', component: HomeComponent },
  // {path : '', redirectTo : '/list', pathMatch : 'full' } 
  // redirect to the home route if the client side route path is empty
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'employees', data: { preload: true }, loadChildren: './employee/employee.module#EmployeeModule' },
  // wild card route
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes, {preloadingStrategy : CustomPreloadingService}) 
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
