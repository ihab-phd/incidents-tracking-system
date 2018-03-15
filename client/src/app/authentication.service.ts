import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {

  public user: User = {
    id: 0,
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    isTracker: false,
    role: ''
  }

  public isLoggedIn: boolean = false;

  private signin_url = '/api/signin';
  private signup_url = '/api/signup';
  private signout_url = '/api/signout';
  private getUserName_url = '/api/getUserName';

  constructor(
    private http: HttpClient,
    private msgService: MessagesService,
    private router: Router) { }

  signup(user: User): Observable<User> {
    console.log('authentication.service -> signup');
    return this.http.post<any>(this.signup_url, user).pipe(
      catchError(this.handleError<any>('signup'))
    )
  }

  signin(user: User): Observable<User> {
    console.log('authentication.service -> signin');
    return this.http.post<User>(this.signin_url, user).pipe(
      tap((user) => {
        this.user = user
        this.isLoggedIn = true;
        console.log(
          'first:' + user.firstName + ' last:' + user.lastName +
          ' user:' + user.userName + ' password:' + user.password + ' isTracker:' + user.isTracker +
          ' role:' + user.role + ' id:' + user.id
        );
      }),
      catchError(this.handleError<any>('signin'))
    );
  }

  signout(): Observable<any> {
    console.log('authentication.service -> signout');
    return this.http.get<any>(this.signout_url).pipe(
      tap((dumy) => {
        this.isLoggedIn = false;
        this.user = {
          id: 0,
          firstName: '',
          lastName: '',
          userName: '',
          password: '',
          isTracker: false,
          role: ''
        };
        console.log('authentication.service -> signout -> success');
      }),
      catchError(this.handleError<any>('signout'))
    );
  }


  getUserName(id): Observable<any> {
    console.log('authentication.service -> getUserName');
    const url = `${this.getUserName_url}/?id=${id}`;
    return this.http.get<any>(url).pipe(
      tap((user) => {
        console.log('authentication.service -> getUserName -> success');
      }),
      catchError(this.handleError<any>('getUserName'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      if(operation == 'signin'){
        this.user = null;
        this.isLoggedIn = false;
      }
      
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        this.msgService.messages = 'An error occurred:' + error.error.message;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(operation + ' ' +
          `Backend returned code ${error.status}, ` +
          `body was: ${error.error}`);
        this.msgService.messages = `Error code ${error.status}, ` +
        `detailes: ${error.error}`
      }
      // Let the app keep running by returning an empty result.
      return (error);
    };
  }

}
