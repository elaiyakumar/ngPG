import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, AbstractControl, FormArray } from '@angular/forms'
import { CustomValidators } from '../../shared/custom.validators';

@Component({
  selector: 'app-employee-custom-validator',
  templateUrl: './employee-custom-validator.component.html',
  styleUrls: ['./employee-custom-validator.component.css']
})
export class EmployeeCustomValidatorComponent implements OnInit {

  employeeForm: FormGroup;
  fullNameLength = 0;


  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(3)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain("msn.com")]],
        confirmEmail: ['', Validators.required]
      }, {validators: matchEmails}),
      phone: [''],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])      
    });

    this.employeeForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.employeeForm);
    });

    // Subscribe to valueChanges observable
    this.employeeForm.get('contactPreference').valueChanges.subscribe(
      (data: string) => {
        this.onContactPrefernceChange(data);
      });

    this.employeeForm.get('fullName').valueChanges.subscribe(
      (value: string) => {
        this.fullNameLength = value.length;
        // this.logValidationErrors(this.employeeForm);
      });

    this.employeeForm.get('skills').valueChanges.subscribe(value => {
      console.log("This is valueChanges.subscribe event of SKILLS " + JSON.stringify(value));
    });

  
  }

  addSkillFormGroup() : FormGroup
    {
      return this.fb.group({
        skillName: ['', Validators.required],
        experienceInYears: ['', Validators.required],
        proficiency: ['', Validators.required]
      });
    }

  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup' : '',
    'phone': '',
    'skillName': '',
    'experienceInYears': '',
    'proficiency': ''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 3 characters.',
      'maxlength': 'Full Name must be less than 6 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email domain should be msn.com.'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm Email is not matching.'
    },
    'phone': {
      'required': 'phone is required.'
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


  // If the Selected Radio Button value is "phone", then add the
  // required validator function otherwise remove it
  onContactPrefernceChange(selectedValue: string) {
    const phoneFormControl = this.employeeForm.get('phone');

    const emailGroupFormControl = this.employeeForm.get('emailGroup');
    const emailFormControl = emailGroupFormControl.get('email');
    const confirmEmailFormControl = emailGroupFormControl.get('confirmEmail');
    // this.formErrors['phone'] = '';
    // this.formErrors['email'] = ''; 

    if (selectedValue === 'phone') {
      phoneFormControl.setValidators(Validators.required);
      emailFormControl.clearValidators();
      confirmEmailFormControl.clearValidators();
    } else {
      phoneFormControl.clearValidators();
      emailFormControl.setValidators(Validators.required);
      confirmEmailFormControl.setValidators(Validators.required);
    }
    phoneFormControl.updateValueAndValidity();
    emailFormControl.updateValueAndValidity();
    confirmEmailFormControl.updateValueAndValidity();

  }

  onSubmit(): void {
    console.log(this.employeeForm.value);
    console.log(this.employeeForm);
    console.log('touched ' + this.employeeForm.touched);
  }


  onLoadClick(): void {
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
        // abstractControl.disabled;
      } else {

      }
    });
  }

  
  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {

      const abstractControl = group.get(key);
      if (abstractControl) {
        if (!abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];
          this.formErrors[key] = [];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              //console.log(errorKey + "-->" + messages[errorKey] + " ->(" + key + ") ->" + this.formErrors.fullName);
              this.formErrors[key] += messages[errorKey] + ' ... ';
            }
          }
        }
        else {
          this.formErrors[key] = [];
        }
      }
      
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
      }
      
      if (abstractControl instanceof FormArray) {
        for(const control of abstractControl.controls)
        {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control);
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

function matchEmails(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}
