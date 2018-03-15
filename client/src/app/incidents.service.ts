import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Incident } from './incident';
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';

@Injectable()
export class IncidentsService {

  private getAll_url = '/api/getAll';
  private getOne_url = '/api/getOne';
  private newIncident_url = '/api/newIncident';
  private updateIncident_url = '/api/updateIncident';

  public incidents_revs: any;

  constructor(
    private http: HttpClient,
    private msgService: MessagesService,
    private router: Router) { }

  getAll(): Observable<any> {
    console.log('incidents.service -> getAll');
    return this.http.get<any>(this.getAll_url).pipe(
      tap((incidents) => {
        console.log('incident.service -> getAll -> success');
        this.incidents_revs = incidents;

        /*
        // To console
        for (var incident of this.incidents_revs) {
          for (var revision of incident['revisions']) {
            console.log('id:' + incident['id'] + ' date:' + revision['date'] + ' type:' +
              revision['type'] + ' short:' + revision['short_desc'] + ' long:' +
              revision['detailed_desc'] + ' cost:' + revision['cost'] + ' class:' +
              revision['class'] + ' res:' + revision['resolution']);
          }
        }*/

        var inc_co: number = 0;
        var rev_co: number = 0;
        var tmp_rev: any = {
          id: 0,
          date: '',
          type: '',
          short: '',
          detailed: '',
          cost: 0,
          class: '',
          res: ''
        };

        /*
        for (var incident of this.incidents_revs) {
          for (var revision of incident['revisions']) {
            if (incident['last_rev_id'] == revision['id']) {
              if (rev_co > 0) {
                tmp_rev = revision;
                revision = incident['revisions'][0];
                incident['revisions'][0] = tmp_rev;
              }
            }
          }
        }*/
        
        for (var incident of this.incidents_revs) {
          for (var revision of incident['revisions']) {
            if (incident['last_rev_id'] == revision['id']) {
              if (rev_co > 0) {
                // Save this rvision on tmp
                tmp_rev.id = revision['id'];
                tmp_rev.date = revision['date'];
                tmp_rev.type = revision['type'];
                tmp_rev.short = revision['short_desc'];
                tmp_rev.detailed = revision['detailed_desc'];
                tmp_rev.cost = revision['cost'];
                tmp_rev.class = revision['class'];
                tmp_rev.res = revision['resolution'];
                // Put revisions[0] on this one
                revision['id'] = incident['revisions'][0]['id'];
                revision['date'] = incident['revisions'][0]['date'];
                revision['type'] = incident['revisions'][0]['type'];
                revision['short_desc'] = incident['revisions'][0]['short_desc'];
                revision['detailed_desc'] = incident['revisions'][0]['detailed_desc'];
                revision['cost'] = incident['revisions'][0]['cost'];
                revision['class'] = incident['revisions'][0]['class'];
                revision['resolution'] = incident['revisions'][0]['resolution'];
                // Put tmp on revisions[0]
                incident['revisions'][0]['id'] = tmp_rev.id;
                incident['revisions'][0]['date'] = tmp_rev.date;
                incident['revisions'][0]['type'] = tmp_rev.type;
                incident['revisions'][0]['short_desc'] = tmp_rev.short;
                incident['revisions'][0]['detailed_desc'] = tmp_rev.detailed;
                incident['revisions'][0]['cost'] = tmp_rev.cost;
                incident['revisions'][0]['class'] = tmp_rev.class;
                incident['revisions'][0]['resolution'] = tmp_rev.res;
              }
            }
            ++rev_co;
          }
          ++inc_co;
        }
      }),
      catchError(this.handleError<any>('getAll'))
    );
  }

  getOne(id): Observable<any> {
    console.log('incidents.service -> getOne');
    const url = `${this.getOne_url}/?id=${id}`;
    return this.http.get<any>(url).pipe(
      tap((revision) => {
        console.log('incident.service -> getOne -> success');
      }),
      catchError(this.handleError<any>('getOne'))
    );
  }

  newIncident(incident: Incident): Observable<string> {
    console.log('incidents.service -> newIncident');
    return this.http.post<string>(this.newIncident_url, incident).pipe(
      tap((res) => {
        console.log('incident.service -> newIncident -> success' + res);
      }),
      catchError(this.handleError<any>('newIncident'))
    );
  }

  updateIncident(incident: Incident): Observable<string> {
    console.log('incidents.service -> updateIncident');
    return this.http.put<string>(this.updateIncident_url, incident).pipe(
      tap((res) => {
        console.log('incident.service -> updateIncident -> success' + res);
      }),
      catchError(this.handleError<any>('updateIncident'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
        this.msgService.messages = 'An error occurred:' + error.error.message;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(operation + ' ' +
          `Error code ${error.status}, ` +
          `detailes: ${error.error}`);
        this.msgService.messages = `Error code ${error.status}, ` +
        `detailes: ${error.message}`
      }

      // Let the app keep running by returning an empty result.
      return (error);
    };
  }

}
