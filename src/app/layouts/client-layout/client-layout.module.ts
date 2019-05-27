import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {ClientLayoutRoutes} from './client-layout.routing';
import {ClientLayoutComponent} from './client-layout.component';
import {SharedModule} from '../../shared/shared.module';
import {HomeClientComponent} from '../../components/client/home-client/home-client.component';
import {AddSessionComponent} from '../../components/client/home-client/add-session/add-session.component';
import {ClientProfileComponent} from '../../components/client/client-profile/client-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(ClientLayoutRoutes),
    CommonModule,
    SharedModule,
  ],
  declarations: [
    ClientLayoutComponent,
    HomeClientComponent,
    AddSessionComponent,
    ClientProfileComponent,
  ],
})
export class ClientLayoutModule { }
