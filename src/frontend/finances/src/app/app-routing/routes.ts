import {Routes} from '@angular/router'

import {HomeComponent} from '../home/home.component';
import {FinancesComponent} from "../finances/finances.component";
import {AboutComponent} from "../about/about.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'finances', component: FinancesComponent},
  {path: 'about', component: AboutComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
