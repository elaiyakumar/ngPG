import { NgModule } from '@angular/core'; 

import { EmployeeRoutingModule } from './employee-routing.module';

import { CreateEmployeeComponent } from './create-employee.component';
import { ListEmployeesComponent } from './list-employees.component';
import { EmployeeCustomValidatorComponent } from './employee-custom-validator/employee-custom-validator.component';
import { DynamicFormControlsComponent } from './dynamic-form-controls/dynamic-form-controls.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CreateEmployeeComponent,
    ListEmployeesComponent,
    EmployeeCustomValidatorComponent ,
    DynamicFormControlsComponent   
  ],
  imports: [     
    EmployeeRoutingModule,
    SharedModule
  ]
})
export class EmployeeModule { }
