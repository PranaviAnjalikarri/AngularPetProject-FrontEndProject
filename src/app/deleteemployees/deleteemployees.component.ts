import { Component, OnDestroy } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { ModelPopUpDelService } from '../services/model-pop-up-del.service';
import { Subscription } from 'rxjs';
import { Employee } from '../interface/employee';
import { EmployeeEventService } from '../services/employee-event.service';

@Component({
  selector: 'app-deleteemployees',
  templateUrl: './deleteemployees.component.html',
  styleUrls: ['./deleteemployees.component.css']
})
export class DeleteemployeesComponent implements OnDestroy {

  employee: any = {};
  employeeId: any;
  employees: Employee[] = [];
  private dataSubscription: Subscription = new Subscription();
  employeeEventService: any;

  constructor(
    private modalDelService: ModelPopUpDelService,
    private employeeService: EmployeeService,
    private employeeEvent:EmployeeEventService
  ) 
  {
    this.employeeId = 0;
  }
/**/
  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  hideDelModal(): void {
    this.modalDelService.hideDelModal();
  }

  deleteEmployee(): void {
    const DataDel = this.modalDelService.currentData.subscribe(data => {
      console.log(data);

      const employeeToDelete: Employee = {
        id: data,
        name: '',
        age: 0,
        phonenumber: '',
        dob: new Date(""),
        gender: '',
        email: ''
      };

      this.employeeService.deleteEmployee(data).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.result=="Employee Deleted") {
            console.log('Deleted successfully', response);
            this.hideDelModal();           
          }
          
          const l=this.employeeEvent.emitEmployeeDeleted(employeeToDelete);
          
        },
      });
    });
  }
}