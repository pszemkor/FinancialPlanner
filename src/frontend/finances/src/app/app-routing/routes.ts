import {Routes} from '@angular/router'

import {HomeComponent} from '../home/home.component';
import {FinancesComponent} from "../finances/finances.component";
import {AboutComponent} from "../about/about.component";
import {MonthComponent} from "../month/month.component";
import {BrowserComponent} from "../browser/browser.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'finances', component: FinancesComponent},
  {path: 'about', component: AboutComponent},
  {path: 'browser', component: BrowserComponent},
  {path: 'finances/:year/:name', component: MonthComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
