import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { MainScreenComponent } from './main-screen/main-screen.component';
import { IncidentReportComponent } from './incident-report/incident-report.component';

const routes: Routes = [
  { path: '', component: SigninComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'main', component: MainScreenComponent },
  { path: 'incident', component: IncidentReportComponent },
  { path: 'incident/:id', component: IncidentReportComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
