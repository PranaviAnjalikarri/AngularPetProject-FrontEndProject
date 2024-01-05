import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, partition } from 'rxjs';
import { Employee} from '../interface/employee';
import { Int32 } from 'mongodb';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  loadEmployeeData(employeeToShow: Employee) {
    throw new Error('Method not implemented.');
  }
  private httpOptions = {

    headers: new HttpHeaders({
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/x-www-form-urlencoded',
      responseType: 'text'
    },
  
  ) };

  private baseUrl = "http://localhost:7299/api";
  
  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    const url = `${this.baseUrl}/GetAllEmployees`;
    return this.http.get<Employee[]>(url);
  }
  postEmployee(employee: Employee): Observable<Employee> {
    console.log("postEmployee called");
    const url = `${this.baseUrl}/CreateEmployee`;
    return this.http.post<Employee>(url, employee,this.httpOptions);
  }
  updateEmployee(employee: Employee): Observable<Employee> {
    const url = `${this.baseUrl}/UpdateEmployee/${employee.id}/${employee.id}`;
    return this.http.put<Employee>(url, employee);
  }
  getEmployeeById(employeeid:Int32): Observable<any> {
    const url = `${this.baseUrl}/GetEmplyeeById/${employeeid}/${employeeid}`;
    return this.http.get<any>(url);
  }
  deleteEmployee(employee: Employee["id"]): Observable<any> {
    const url = `${this.baseUrl}/DeleteEmployeeById/${employee}/${employee}`;
    return this.http.delete<Employee>(url);
  }

}
