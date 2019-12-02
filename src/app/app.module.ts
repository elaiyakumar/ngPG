import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './employee/create-employee.component';
import { ListEmployeesComponent } from './employee/list-employees.component';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeCustomValidatorComponent } from './employee/employee-custom-validator/employee-custom-validator.component';
import { DynamicFormControlsComponent } from './employee/dynamic-form-controls/dynamic-form-controls.component';
import { EmployeeService } from './employee/employee.service';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from './page-not-found.component';

 

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    ListEmployeesComponent,
    EmployeeCustomValidatorComponent,
    DynamicFormControlsComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule    
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
