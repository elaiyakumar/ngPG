import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeesComponent } from './list-employees.component';
import { EmployeeCustomValidatorComponent } from './employee-custom-validator/employee-custom-validator.component';
import { DynamicFormControlsComponent } from './dynamic-form-controls/dynamic-form-controls.component';


@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent,
    EmployeeCustomValidatorComponent ,
    DynamicFormControlsComponent   
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
