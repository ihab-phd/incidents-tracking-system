import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { HttpClientModule }    from '@angular/common/http';

import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { IncidentReportComponent } from './incident-report/incident-report.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from './authentication.service';
import { AppRoutingModule } from './app-routing.module';
import { IncidentsService } from './incidents.service';
import { MessagesService } from './messages.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    MainScreenComponent,
    IncidentReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    AuthenticationService,
    IncidentsService,
    MessagesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
