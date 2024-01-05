import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
import { ModelPopUpEditService } from '../services/model-pop-up-edit.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Employee } from '../interface/employee';
import { EmployeeEventService } from '../services/employee-event.service';

@Component({
  selector: 'app-editemployees',
  templateUrl: './editemployees.component.html',
  styleUrls: ['./editemployees.component.css']
})
export class EditemployeesComponent implements OnInit {
  employeeId: any;
  employee: any = {};
  employees: Employee[] = [];
  updateEmployeeForm = new FormGroup({
    id: new FormControl(''),
    Name: new FormControl(''),
    Age: new FormControl(0),
    Gender: new FormControl(''),
    DOB: new FormControl(''),
    PhoneNumber: new FormControl(''),
    Email: new FormControl('')
  });
  employeetestId: string | undefined;
  
  constructor(
    private modalEditService: ModelPopUpEditService,
    private employeeService: EmployeeService,
    private employeeEvent:EmployeeEventService
  ) {
    this.employeeId = 0;
  }

  ngOnInit(): void {
    this.modalEditService.currentData.subscribe(data => {
      console.log(data);
      this.employeetestId = data;
      this.loadEmployeeData(this.employeetestId);
      
  
    });
  }

  loadEmployeeData(data: any): void {   
   console.log(data,'id')
      this.employeeService.getEmployeeById(data).subscribe((result: any) => {
        console.log(result);
        this.updateEmployeeForm.setValue({id:result.id,
          Name:result.name,
          Age:result.age,
          Gender:result.gender,
          DOB:result.dob,
          PhoneNumber:result.phonenumber,
          Email:result.email
        });

      });
  }
  

  updateEmployee(): void {
    this.employee = this.updateEmployeeForm.value;
    this.employeeService.updateEmployee(this.employee).subscribe({
      next: (result: any) => {
        if (result.result=="Employee Updated") {
          console.log('Employee data updated successfully:');
          this.hideEditModal();
          this.employeeService.getAllEmployees().subscribe((result: any) => {
            this.employeeEvent.emitEmployeeUpdated();
          
          });
        } else {
          console.error('Error occur while update the employee details. Server response:', result);
        }
      },
    });
  }
  
  hideEditModal(): void {
    this.modalEditService.hideEditModal();
  }
}
