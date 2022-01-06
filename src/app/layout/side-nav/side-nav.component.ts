import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {

  constructor(
    private router: Router,
  ) { }

  opened: boolean;
  routes = [
    {
      title: 'SectorsTable',
      route: 'feelings-table'
    },
    {
      title: 'Dashboard',
      route: 'dashboard'
    }
  ];

  toggleDrawer(event: any): void {
    this.opened = event;
  }

  navigateToPage(route: string) {
    this.opened = false;
    this.router.navigateByUrl(route);
  }

}
