import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { EmployeeCustomValidatorComponent } from './employee/employee-custom-validator/employee-custom-validator.component';
import { DynamicFormControlsComponent } from './employee/dynamic-form-controls/dynamic-form-controls.component';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

const appRoutes :   Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'list', component : ListEmployeesComponent},
  { path : 'create', component : CreateEmployeeComponent }, 
  { path: 'edit/:id', component: DynamicFormControlsComponent },
  { path : 'customValidator', component : EmployeeCustomValidatorComponent },
  { path : 'dynamicControls', component : DynamicFormControlsComponent },
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
