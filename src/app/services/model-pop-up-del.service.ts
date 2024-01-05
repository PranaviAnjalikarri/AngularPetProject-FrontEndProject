import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelPopUpDelService {
  private myBehaviorSubject = new BehaviorSubject<string>('1');
  http: any;
  public data =new BehaviorSubject("")
  currentData=this.data.asObservable();
  constructor() { }

  isDelModalVisible = false;
  showDelModal(): void {
    this.isDelModalVisible = true;
  }
  hideDelModal(): void {
    this.isDelModalVisible = false;
  }
  setData(data: any)
  {
    this.data.next(data);
  }
}
