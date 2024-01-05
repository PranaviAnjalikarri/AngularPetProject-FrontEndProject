import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GetallemployeesComponent } from './getallemployees/getallemployees.component';
import { HttpClientModule } from '@angular/common/http';
import { AddemployeesComponent } from './addemployees/addemployees.component';
import { ModelPopUpService } from './services/model-pop-up.service';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DeleteemployeesComponent } from './deleteemployees/deleteemployees.component';
import { EditemployeesComponent } from './editemployees/editemployees.component';

@NgModule({
  declarations: [
    AppComponent,
    GetallemployeesComponent,
    AddemployeesComponent,
    DeleteemployeesComponent,
    EditemployeesComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ModelPopUpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
