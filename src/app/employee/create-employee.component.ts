import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  fullNameLength = 0;

  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'fullName': '',
    'email': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.'
    },
    'skillName': {
      'required': 'Skill Name is required.',
    },
    'experienceInYears': {
      'required': 'Experience is required.',
    },
    'proficiency': {
      'required': 'Proficiency is required.',
    },
  };


  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', Validators.required],
      skills: this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['beginner'],
      })
    });

    // Subscribe to valueChanges observable
    this.employeeForm.get('fullName').valueChanges.subscribe(
      (value: string) => {
        this.fullNameLength = value.length;
      });

    // Subscribe to nested form valueChanges i.e skills
    this.employeeForm.get('skills').valueChanges.subscribe(value => {
      console.log("This is valueChanges.subscribe event " + JSON.stringify(value));
    });
  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm);
    console.log('touched ' + this.employeeForm.touched);
  }

  onLoadClick(): void {
    // this.employeeForm.setValue({
    //   fullName: 'EKR',
    //   email: 'test@test.com',
    //   skills: {
    //     skillName: 'Writing',
    //     experienceInYears: 10,
    //     proficiency: "intermediate"
    //   }
    // });
    //this.logKeyValuePairs(this.employeeForm);
    this.logValidationErrors(this.employeeForm);
    console.log(this.formErrors);
  }


  onLoadPartialClick(): void {
    this.employeeForm.patchValue({
      fullName: 'EKR',
      email: 'Elaiya@Elaiya.com'
    });
  }

  disableChildControl(): void {
    Object.keys(this.employeeForm.controls).forEach((key: string) => {
      const abstractControl = this.employeeForm.get(key);
      if (abstractControl instanceof FormGroup) {
        abstractControl.disable();
      } else {

      }
    });
  }

  logValidationErrors(group : FormGroup) : void {
    Object.keys(group.controls).forEach((key: string) => {
       
      const abstractControl = group.get(key);

      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);       
      } 
      else 
      {
        if (abstractControl && !abstractControl.valid)
        {
          const messages = this.validationMessages[key];
           this.formErrors[key] =  [];
          for(const errorKey in abstractControl.errors)
          {
            
            if(errorKey)
            {
              this.formErrors[key] += messages[errorKey] + '  ';
            }
          }
        }
        
      }
    });
  }

  logKeyValuePairs(group: FormGroup): void {
    console.log("This is from logKeyValuePairs");
    console.log(Object.keys(group.controls)); // loop through each key in the FormGroup
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
        console.log("This is from LOOP of logKeyValuePairs");
        console.log('Key = ' + key + ' && Value = ' + abstractControl.value);
      }
    });
  }
}
