import { Component, OnInit } from '@angular/core';
import { IEmployee } from './IEmployee'
import { EmployeeService } from './employee.service'

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {

  employees: IEmployee[];

  constructor(private _employeeService: EmployeeService) { }

  ngOnInit() {
    this._employeeService.getEmployees()
      .subscribe(
        (list) => this.employees = list,
        (err) => console.log(err)
        );
  }

}
