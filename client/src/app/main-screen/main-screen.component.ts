import { Component, OnInit } from '@angular/core';
import { IncidentsService } from '../incidents.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.css']
})
export class MainScreenComponent implements OnInit {

  private tot_incidents: number = 0;
  private tot_info_related: number = 0;
  private tot_nonInfo_related: number = 0;
  private tot_security: number = 0;
  private tot_minor: number = 0;
  private tot_major: number = 0;

  constructor(
    private incidentsService: IncidentsService,
    private authService: AuthenticationService,
    private router: Router,
    private msgService: MessagesService) { }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.getAll();
    }
  }

  updateGUI(): void {
    console.log("main-screen.component -> updateGUI -> ");
    this.tot_incidents = this.incidentsService.incidents_revs.length;
    this.tot_info_related = 0;
    this.tot_nonInfo_related = 0;
    this.tot_security = 0;
    this.tot_minor = 0;
    this.tot_major = 0;

    for (var incident of this.incidentsService.incidents_revs) {
        if (incident['revisions'][0]['type'] == 'Information Related') {
          ++this.tot_info_related;
        } else if (incident['revisions'][0]['type'] == 'Non-Information Related') {
          ++this.tot_nonInfo_related;
        }

        if (incident['revisions'][0]['class'] == 'Security Weakness') {
          ++this.tot_security;
        } else if(incident['revisions'][0]['class'] == 'Minor Incident') {
          ++this.tot_minor;
        } else if(incident['revisions'][0]['class'] == 'Major Incident') {
          ++this.tot_major;
        }
        //console.log("main-screen.component -> updateGUI -> "+revision['cost']);
    }
    //this.tot_incidents = this.incidents_revs[0].revisions[0].cost;
    /*for (var i=0; i<this.incidents_revs.length; i++) {
      for (var j=0; j<this.incidents_revs[i].revisions.length; j++) {
        console.log("main-screen.component -> updateGUI -> "+this.incidents_revs[i].revisions[j].cost);
      }
    }*/
  }

  getAll(): void {
    this.incidentsService.getAll().subscribe(
      //(incidents: Incident_Rev[]) => {
      (incidents: any) => {
          console.log('main-screen.component -> getAll -> success');
          this.updateGUI();
      },
      (error) => {
        console.log("main-screen.component -> getAll -> Error")
      }
    );
  }

  newIncident(): void {
    this.msgService.messages = '';
    this.router.navigate(['/incident'])
  }

}
