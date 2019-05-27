import {Routes} from '@angular/router';
import {SuperAdminLayoutComponent} from './super-admin-layout.component';
import {AgencyComponent} from '../../components/agency/agency.component';


export const SuperAdminLayoutRoutes: Routes = [{
  

    path: 'super-admin',
    component: SuperAdminLayoutComponent,
    children: [{
        path: 'agency',
        component: AgencyComponent,
      }]
 }]