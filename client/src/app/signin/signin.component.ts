import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { User } from '../user';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    isTracker: false,
    role: ''
  };

  inputType: string = 'password';
  showHideTxt: string = 'Show password';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private msgService: MessagesService) { }

  ngOnInit() {
  }

  signin(): void {
    console.log('signin.component -> signin');
    var msg: string = 'Please enter the following information:<br>';
    var msgFlag: boolean = false;

    if (this.user.userName.trim() == '') {
      msg += 'user name<br>';
      msgFlag = true;
    }
    if (this.user.password.trim() == '') {
      msg += 'password';
      msgFlag = true;
    }

    if(msgFlag == true){
      this.msgService.messages = msg;
    } else {
      this.authService.signin(this.user)
        .subscribe(
          (res) => {
            this.msgService.messages = '';
            this.router.navigate(['/main'])
            console.log('signin.component -> signin -> success');
          },
          (error) => {
            console.log('signin.component -> signin -> Error');
          }
        );
    }
  }


  signup(): void {
    this.msgService.messages = '';
    this.router.navigate(['/signup'])
  }


  switchInputPass() {
    if(this.inputType == 'password') {
      this.inputType = 'text'
      this.showHideTxt = 'Hide password';
    } else {
      this.inputType = 'password';
      this.showHideTxt = 'Show password';
    }
  }
}
