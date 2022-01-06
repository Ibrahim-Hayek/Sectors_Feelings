import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeelingsTableComponent } from './pages/feelings-table/feelings-table.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/feelings-table' },
  {
    path: 'feelings-table',
    component: FeelingsTableComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ useHash: true }),],
  exports: [RouterModule]
})
export class AppRoutingModule { }
