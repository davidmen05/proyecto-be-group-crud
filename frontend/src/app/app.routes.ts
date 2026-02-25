import { Routes } from '@angular/router';
import { ServiceListComponent } from './components/service-list/service-list.component';

export const routes: Routes = [
  { path: '', redirectTo: '/services', pathMatch: 'full' },
  { path: 'services', component: ServiceListComponent }
];