import {Component, OnInit} from '@angular/core';


declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: './dashboard', title: 'Dashboard',  icon: 'business_chart-bar-32', class: '' },
  {path: './cars', title: 'Vos Voitures', icon: 'shopping_delivery-fast', class: ''},
  {path: './admin-panne', title: 'les Pannes', icon: 'ui-2_settings-90', class: ''},
  {path: './moniteurs', title: 'Vos Moniteurs', icon: 'users_single-02', class: ''},
  {path: './planing', title: 'Validation des session', icon: 'ui-2_like', class: ''},
  {path: './admin-calendar', title: 'Calendrier des session', icon: 'ui-1_calendar-60', class: ''},
  {path: './admin-calendarexame', title: 'Calendrier des exames', icon: 'business_badge', class: ''},
  {path: './exam', title: 'Examen', icon: 'education_paper', class: ''},
  {path: './passive-client', title: 'Client passive', icon: 'emoticons_satisfied', class: ''},
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    return window.innerWidth <= 981;
  }
}
