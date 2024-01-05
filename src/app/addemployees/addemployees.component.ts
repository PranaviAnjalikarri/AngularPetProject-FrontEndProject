import { Component, ViewChild } from '@angular/core';
import { ModelPopUpService } from '../services/model-pop-up.service';
import { EmployeeService } from '../services/employee.service';
import { EmployeeEventService } from '../services/employee-event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { json } from 'body-parser';
@Component({
  selector: 'app-addemployees',
  templateUrl: './addemployees.component.html',
  styleUrls: ['./addemployees.component.css']
})
export class AddemployeesComponent {
  newEmployeeForm: FormGroup;
  newEmployee: any = {};
  errorMessage!: string;

  constructor(
    private fb: FormBuilder,
    private modalService: ModelPopUpService,
    private employeeService: EmployeeService,
    private employeeEventService: EmployeeEventService
  ) {
    this.newEmployeeForm = this.fb.group({
      
     /* Id: ['', [Validators.required]],*/
      Name: ['', [Validators.required]],
      Age: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      DOB: ['',[Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/) ]],
      Gender: ['', [Validators.required]],
      PhoneNumber: ['',[Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      Email: ['',[Validators.required]]
    });

  }
  
  addEmployee(): void {
    console.log("addEmployee")
    if (this.newEmployeeForm.valid) {

      // this.employeeService.postEmployee(this.newEmployeeForm.value).subscribe((result:any)=>{
      //   console.log(result);

      //   // console.log(result.success);
      //   // console.log(result.success.status);
      // });

      this.employeeService.postEmployee(this.newEmployeeForm.value).subscribe({
        next: (result: any) => {
          if (result.result=="Employee Added") {
            console.log('Employee details added successfully:');
            this.hideModal();
            this.employeeEventService.emitEmployeeAdded();
          }
          else {
            this.errorMessage = result.message;
            console.error('Error is there in employee details', result);
          }
        }
       
      });
    } 
  }
  hideModal(): void {
    this.modalService.hideModal();
  }
}
