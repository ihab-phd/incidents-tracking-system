import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { MessagesService } from './messages.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Security Incident Reporting System';
  footer = '@Maestro';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private msgService: MessagesService) { }

  ngOnInit() {
    this.router.navigate(['/signin'])
  }

  signout(): void {
    this.authService.signout().subscribe(
      (res) => {
        console.log('app.component -> signout -> success');
        this.router.navigate(['/signin']);
        this.msgService.messages = 'User signedout successfully';
      },
      (error) => {
        console.log("app.component -> signout -> Error" + error);
        this.router.navigate(['/signin']);
        this.msgService.messages = 'Failed to signout';
      }
    );
  }

}
