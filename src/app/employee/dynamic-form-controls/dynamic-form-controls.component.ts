import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, AbstractControl, FormArray } from '@angular/forms'
import { CustomValidators } from '../../shared/custom.validators';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../IEmployee';

@Component({
  selector: 'app-dynamic-form-controls',
  templateUrl: './dynamic-form-controls.component.html',
  styleUrls: ['./dynamic-form-controls.component.css']
})
export class DynamicFormControlsComponent implements OnInit {

  employeeForm: FormGroup;
  fullNameLength = 0;

  
  // This object will hold the messages to be displayed to the user
  // Notice, each key in this object has the same name as the
  // corresponding form control
  formErrors = {
    'fullName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
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



  constructor(private fb: FormBuilder,  
    private route : ActivatedRoute,
    private _employeeService: EmployeeService) { } 

  ngOnInit() {

    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.maxLength(6), Validators.minLength(3)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group(
        {
          email: ['', [Validators.required, CustomValidators.emailDomain("msn.com")]],
          confirmEmail: ['', Validators.required]
        },
        { validators: matchEmails }
      ),
      phone: [''],
      skills: this.fb.array([
        this.addSkillFormGroup(0)
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

    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.getEmployee(empId);
      }
    });

  }  // close ngOnInit()

  // ngAfterViewInit()
  // { 
  //   this.logValidationErrors(this.employeeForm);
  // }
  
  getEmployee(id:number)
  {
    this._employeeService.getEmployee(id).subscribe(
      (employee : IEmployee) => this.editEmployee(employee),
      (err : any) => console.log(err)
    );
  }
  
  editEmployee(employee : IEmployee )
  {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });
  }
  

  addSkillButtonClick(): void 
  {
    let  i = (<FormArray>this.employeeForm.get('skills')).length;
    const group = this.addSkillFormGroup(i);
    (<FormArray>this.employeeForm.get('skills')).push(group);
  }

  addSkillFormGroup(i): FormGroup 
  {
    var skillName = "skillName_" + i;
    this.formErrors['skillName_' + i] = '' ;
    // var experienceInYears = "experienceInYears_" + i;
    // var proficiency = "proficiency_" + i;    

    return this.fb.group({
      [skillName]: ['', Validators.required],
       experienceInYears : [''],
       proficiency : ['', Validators.required]
    });

  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    //console.log(" logValidationErrors >>>> START" ); 
    // console.log("LOG ValidationErrors >> " + this.employeeForm.get('skills').invalid);
    Object.keys(group.controls).forEach((key: string) => {
      //console.log(" logValidationErrors " +  key);   

      const abstractControl = group.get(key);

      if(abstractControl instanceof FormArray) {console.log("AbstractControl is FormArray with key = " + key );}
      if(abstractControl instanceof FormGroup) {console.log("AbstractControl is FormGroup with key = " + key );}
      
      if (abstractControl && !(abstractControl instanceof FormArray)) 
      {
        console.log(key + " >> ABOVE IF [abstractControl.valid] ");
         
        if (!abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty || abstractControl.value !== '')) {
          
            let rootKey = key;
            if(key.includes("_")) 
            {
              rootKey = key.split("_")[0];
            }

          const messages = this.validationMessages[rootKey];
          this.formErrors[key] = [];
          console.log("aControl.value >> " + abstractControl.value  + "messages >> " + messages + " key >> " + key + " rootKey >> " + rootKey + " >> " + group.controls);
          

          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              console.log(errorKey + "-->" + messages[errorKey] + " ==>(" + key + ") ==>" );
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
        console.log("abstractControl FormArray");
        for (const control of abstractControl.controls) {
          if (control instanceof FormGroup) {
            this.logValidationErrors(control);
          }
        }
      }

    });
  }
  
  getInvalidClass(baseName : string ,i : string)
  {  
    if(this.formErrors[baseName + '_' + i].length > 0)
    {
      return "is-invalid";  
    }
    return "";
  } 

  isInvalid(baseName : string ,i : string)
  {
    if(this.formErrors[baseName + '_' + i].length > 0)
    {  
      return true;  
    } 
    return false;
  } 

  getErrorMessage(baseName : string ,i : string)
  {
    // console.log("getErrorMessage >> " + this.employeeForm.get('skills').invalid);
    if(this.formErrors[baseName + '_' + i].length > 0)
    {      
      return this.formErrors[baseName + '_' + i] + " formControlName(" + baseName + '_' + i + ")";  
    }   
    return "";
  } 

  removeSkillButtonClick(skillGroupIndex: number): void {
    (<FormArray>this.employeeForm.get('skills')).removeAt(skillGroupIndex);
  }

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
      emailFormControl.setValidators(CustomValidators.emailDomain("msn.com"));
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

  if (emailControl.value === confirmEmailControl.value || 
    ( confirmEmailControl.pristine && confirmEmailControl.value === "")) {
    return null;
  } else {
    return { 'emailMismatch': true };
  }
}

