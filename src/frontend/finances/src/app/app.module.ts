import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {HeaderComponent} from './header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FlexModule} from "@angular/flex-layout";
import {FinancesComponent} from './finances/finances.component';
import {AboutComponent} from './about/about.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {baseurl} from './shared/baseurl';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FinancesComponent,
    AboutComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    FlexModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
