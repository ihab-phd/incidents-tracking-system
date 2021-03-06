import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    isTracker: false,
    role: ''
  };

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private msgService: MessagesService) { }

  ngOnInit() {
  }

  signup(): void {
    console.log('signup.component -> signup');
    var msg: string = 'Please enter the following information:<br>';
    var msgFlag: boolean = false;

    if (this.user.firstName.trim() == '') {
      msg += 'first name<br>';
      msgFlag = true;
    }
    if (this.user.lastName.trim() == '') {
      msg += 'last name<br>';
      msgFlag = true;
    }
    if (this.user.userName.trim() == '') {
      msg += 'user name<br>';
      msgFlag = true;
    }
    if (this.user.password.trim() == '') {
      msg += 'password<br>';
      msgFlag = true;
    }

    if (msgFlag == true) {
      this.msgService.messages = msg;
    } else {
      this.authService.signup(this.user)
        .subscribe(
          (res) => {
            this.router.navigate(['/signin'])
            console.log('signup.component -> signup -> success');
            this.msgService.messages = "User created successfully";
          },
          (error) => {
            console.log("signup.component -> signup -> Error")
          }
        );
    }
  }

  signin(): void {
    this.msgService.messages = '';
    this.router.navigate(['/signin'])
  }
}
