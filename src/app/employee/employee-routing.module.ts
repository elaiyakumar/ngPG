import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeesComponent } from './list-employees.component';
import { EmployeeCustomValidatorComponent } from './employee-custom-validator/employee-custom-validator.component';
import { DynamicFormControlsComponent } from './dynamic-form-controls/dynamic-form-controls.component';


const appRoutes: Routes = [
  {
    path: 'employees',
    children:[
      { path: '', component: ListEmployeesComponent },
      { path: 'create', component: CreateEmployeeComponent },
      { path: 'edit/:id', component: DynamicFormControlsComponent },
      { path: 'customValidator', component: EmployeeCustomValidatorComponent },
      { path: 'dynamicControls', component: DynamicFormControlsComponent }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(appRoutes)
  ],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
