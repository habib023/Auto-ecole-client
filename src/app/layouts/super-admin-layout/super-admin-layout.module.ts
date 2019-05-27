import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {SuperAdminLayoutComponent} from './super-admin-layout.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AgencyComponent } from '../../components/agency/agency.component';
import {SuperAdminLayoutRoutes} from './super-admin-layout.routing';
import {SharedModule} from '../../shared/shared.module';





@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ReactiveFormsModule,
      SharedModule,
      RouterModule.forChild(SuperAdminLayoutRoutes),
      
    ],
    declarations: [
        SuperAdminLayoutComponent,
        AgencyComponent,
          ],
  })
  export class SuperAdminLayoutModule { }