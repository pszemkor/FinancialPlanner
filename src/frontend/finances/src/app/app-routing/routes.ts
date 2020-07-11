import {Routes} from '@angular/router'

import { HomeComponent } from '../home/home.component';
import {FinancesComponent} from "../finances/finances.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'finances', component: FinancesComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
