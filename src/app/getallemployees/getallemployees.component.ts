import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../interface/employee';
import { ModelPopUpService } from '../services/model-pop-up.service';
import { EmployeeEventService } from '../services/employee-event.service';
import { ModelPopUpDelService } from '../services/model-pop-up-del.service';
import { ModelPopUpEditService } from '../services/model-pop-up-edit.service';

@Component({
  selector: 'app-getallemployees',
  templateUrl: './getallemployees.component.html',
  styleUrls: ['./getallemployees.component.css']
})
export class GetallemployeesComponent implements OnInit {
  public employees: Employee[] = [];
  data:string = "";
  constructor(private employeeService: EmployeeService,
    public modalService: ModelPopUpService,
    public modalDelService: ModelPopUpDelService,
    public modalEditService: ModelPopUpEditService,
    private employeeEventService: EmployeeEventService,
  ) {

  }

  ngOnInit() {
    this.employeeService.getAllEmployees().subscribe((result: Employee[]) => {
      console.log(result);
      this.employees = result;
      this.employees.forEach(i => {
        console.log(i.id);
      });
      this.data="got the data";
      console.log(this.data);
      console.log(this.employees);
    });

    this.employeeEventService.employeeAdded$.subscribe(() => {
      this.refreshEmployees();
    });
    this.employeeEventService.employeeDeleted$.subscribe(deletedEmployee => {
      this.refreshEmployees();
    });
    this.employeeEventService.employeeUpdated$.subscribe(()=> {
      this.refreshEmployees();
    })
  }


  showModal(): void {
    this.modalService.showModal();
  }

  hideModal(): void {
    this.modalService.hideModal();
  }
  showDelModal(employee: any): void {
    this.modalDelService.showDelModal();
    console.log(employee, 'test')

    this.modalDelService.setData(employee.id)
  }

  hideDelModal(): void {
    this.modalDelService.hideDelModal();

  }
  showEditModal(employee: any): void {

    console.log(employee, 'test')
    this.modalEditService.showEditModal();
    this.modalEditService.setData(employee.id)

  }
  hideEditModal(): void {
    this.modalEditService.hideEditModal();
  }
  refreshEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((result: Employee[]) => {
      this.employees = result;
      console.log(this.employees);
    });
  }
}
