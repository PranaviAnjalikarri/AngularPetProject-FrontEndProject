import { Injectable } from '@angular/core';
import { Subject, subscribeOn } from 'rxjs';
import { Employee } from '../interface/employee';
@Injectable({
  providedIn: 'root'
})
export class EmployeeEventService {
  private employeeAddedSubject = new Subject<void>();
  private employeeDeletedSubject = new Subject<Employee>();
  private employeeUpadtedSubject=new Subject<void>();
  employeeAdded$ = this.employeeAddedSubject.asObservable();
  employeeDeleted$ = this.employeeDeletedSubject.asObservable();
  employeeUpdated$ = this.employeeUpadtedSubject.asObservable();
  emitEmployeeAdded(): void {
    this.employeeAddedSubject.next();
  }
  emitEmployeeDeleted(deletedEmployee: Employee): void {
    this.employeeDeletedSubject.next(deletedEmployee);
  }
  emitEmployeeUpdated(): void {
    this. employeeUpadtedSubject.next();
  }
}


