
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModelPopUpService {
  isModalVisible = false;
  
  showModal(): void {
    this.isModalVisible = true;
  }

  hideModal(): void {
    this.isModalVisible = false;
  }
 
}
