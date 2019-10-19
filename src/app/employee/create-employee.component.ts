import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm : FormGroup;
fullNameLength = 0;
  constructor(private fb : FormBuilder) {   }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName : ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email : ['test@test.com'],
      skills : this.fb.group({
        skillName : [''],
        experienceInYears : [''],
        proficiency : ['beginner'],
      })
    });

  // Subscribe to valueChanges observable
  this.employeeForm.get('fullName').valueChanges.subscribe(
    (value : string) => {
      this.fullNameLength = value.length;       
    }
  );

  // Subscribe to nested form valueChanges i.e skills
  this.employeeForm.get('skills').valueChanges.subscribe( value => {
    console.log("This is valueChanges.subscribe event " + JSON.stringify(value));       
    }
  );

}

  onSubmit() : void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm);
    console.log('touched ' + this.employeeForm.touched);
  }

  onLoadClick() : void {
    this.employeeForm.setValue({
      fullName : 'EKR',
      email : 'test@test.com',
      skills : { 
        skillName : 'Writing', 
        experienceInYears : 10,
        proficiency : "intermediate"
      }
    });
    this.logKeyValuePairs(this.employeeForm);
  }

  
  onLoadPartialClick() : void {
    this.employeeForm.patchValue ({
      fullName : 'Elaiya Kumar',
      email : 'Elaiya@Elaiya.com' 
    });
  }

  disableChildControl() : void {     
    Object.keys(this.employeeForm.controls).forEach((key: string) => {       
      const abstractControl = this.employeeForm.get(key);       
      if (abstractControl instanceof FormGroup) {
        abstractControl.disable();
      } else {
      
      }
    });
  }

  logKeyValuePairs(group: FormGroup): void {    
   console.log( "This is from logKeyValuePairs");
   console.log( Object.keys(group.controls)); // loop through each key in the FormGroup
   Object.keys(group.controls).forEach((key: string) => {
     // Get a reference to the control using the FormGroup.get() method
     const abstractControl = group.get(key);
     // If the control is an instance of FormGroup i.e a nested FormGroup
     // then recursively call this same method (logKeyValuePairs) passing it
     // the FormGroup so we can get to the form controls in it
     if (abstractControl instanceof FormGroup) {
       this.logKeyValuePairs(abstractControl);
       // If the control is not a FormGroup then we know it's a FormControl
     } else {
      console.log( "This is from LOOP of logKeyValuePairs");
       console.log('Key = ' + key + ' && Value = ' + abstractControl.value);
     }
   });
 }
}
