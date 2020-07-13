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
import {HttpClientModule} from "@angular/common/http";
import {MonthComponent} from './month/month.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {FooterComponent} from './footer/footer.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AddEventComponent} from './add-event/add-event.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FinancesComponent,
    AboutComponent,
    MonthComponent,
    FooterComponent,
    AddEventComponent
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
    FontAwesomeModule,
    HttpClientModule,
    MatGridListModule,
    MatDialogModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  entryComponents: [AddEventComponent]
})
export class AppModule {
}
