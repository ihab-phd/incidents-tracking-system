import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Incident } from '../incident';
import { IncidentsService } from '../incidents.service';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-incident-report',
  templateUrl: './incident-report.component.html',
  styleUrls: ['./incident-report.component.css']
})
export class IncidentReportComponent implements OnInit {

  private isNew: boolean;
  private rev_id: number;
  private person_id: number;
  private incident: Incident = {
    incident_id: 0,
    userName: '',
    trackerName: '',
    date: new Date(Date.now()),
    type: '',
    short_desc: '',
    detailed_desc: '',
    cost: 0,
    class: '',
    resolution: ''
  };

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private incidentsService: IncidentsService,
    private authService: AuthenticationService,
    private router: Router,
    private msgService: MessagesService) { }

  ngOnInit() {
    this.msgService.messages = '';
    console.log('incident.component -> ngOnInit')
    const id = +this.route.snapshot.paramMap.get('id');
    if (id == 0) {
      this.isNew = true;
    } else {
      this.isNew = false;
      this.rev_id = id;
      //this.getOne();
      this.updateGUI();
      this.getUserName();
    }
  }

  getUserName(): void {
    this.authService.getUserName(this.person_id).subscribe(
      (user) => {
        console.log('incident-report.component -> getUserName -> success');
        if(this.authService.user.isTracker){
          this.incident.userName = user['userName'];
        } else {
          this.incident.trackerName = user['userName'];
        }
      },
      (error) => {
        console.log('incident-report.component -> getUserName -> Error');
      }
    );
  }


  goBack(): void {
    this.msgService.messages = '';
    this.router.navigate(['/main'])
  }

  updateGUI(): void {
    for (var incident of this.incidentsService.incidents_revs) {
      for (var revision of incident['revisions']) {
        if (revision['id'] == this.rev_id) {
          this.incident.incident_id = incident['id'];
          this.incident.date = revision['date'];
          this.incident.type = revision['type'];
          this.incident.short_desc = revision['short_desc'];
          this.incident.detailed_desc = revision['detailed_desc'];
          this.incident.cost = revision['cost'];
          this.incident.class = revision['class'];
          this.incident.resolution = revision['resolution'];
          if(this.authService.user.isTracker){
            this.person_id = incident['user_id'];
          } else {
            this.person_id = incident['tracker_id'];
          }
        }
      }
    }
  }

  newIncident(): void {
    this.msgService.messages = '';
    var msg: string = 'Please enter the following information:<br>';
    var msgFlag: boolean = false;

    if (this.incident.trackerName.trim() == '') {
      msg += 'tracker name<br>';
      msgFlag = true;
    }
    if (this.incident.date.toString().trim() == '') {
      msg += 'date<br>';
      msgFlag = true;
    }
    if (this.incident.type.trim() == '') {
      msg += 'type<br>';
      msgFlag = true;
    }
    if (this.incident.short_desc.trim() == '') {
      msg += 'short description<br>';
      msgFlag = true;
    }
    if (this.incident.detailed_desc.trim() == '') {
      msg += 'detailed description<br>';
      msgFlag = true;
    }
    if (this.incident.cost.toString().trim() == '') {
      msg += 'cost<br>';
      msgFlag = true;
    }
    if (this.incident.class.trim() == '') {
      msg += 'class<br>';
      msgFlag = true;
    }

    if (msgFlag == true) {
      this.msgService.messages = msg;
    } else {
      this.incidentsService.newIncident(this.incident).subscribe(
        (res) => {
          this.msgService.messages = '';
          this.router.navigate(['/main'])
          console.log('incident-report.component -> newIncident -> success');
        },
        (error) => {
          console.log('incident-report.component -> newIncident -> Error');
        }
      );
    }
  }

  /*getOne(): void {
    this.incidentsService.getOne(this.id).subscribe(
      (revision) => {
        console.log('incident-report.component -> getOne -> success');
      },
      (error) => {
        console.log('incident-report.component -> getOne -> Error');
      }
    );
  }*/

  updateIncident(): void {
    this.msgService.messages = '';
    var msg: string = 'Please enter the following information:<br>';
    var msgFlag: boolean = false;

    if (this.authService.user.isTracker) {
      if (this.incident.userName.trim() == '') {
        msg += 'user name<br>';
        msgFlag = true;
      }
      if (this.incident.resolution.trim() == '') {
        msg += 'resolution<br>';
        msgFlag = true;
      }
    } else {
      if (this.incident.trackerName.trim() == '') {
        msg += 'tracker<br>';
        msgFlag = true;
      }
    }

    if (this.incident.date.toString().trim() == '') {
      msg += 'date<br>';
      msgFlag = true;
    }
    if (this.incident.type.trim() == '') {
      msg += 'type<br>';
      msgFlag = true;
    }
    if (this.incident.short_desc.trim() == '') {
      msg += 'short description<br>';
      msgFlag = true;
    }
    if (this.incident.detailed_desc.trim() == '') {
      msg += 'detailed description<br>';
      msgFlag = true;
    }
    if (this.incident.cost.toString().trim() == '') {
      msg += 'cost<br>';
      msgFlag = true;
    }
    if (this.incident.class.trim() == '') {
      msg += 'class<br>';
      msgFlag = true;
    }

    if (msgFlag == true) {
      this.msgService.messages = msg;
    } else {
      this.incidentsService.updateIncident(this.incident).subscribe(
        (res) => {
          this.msgService.messages = '';
          this.router.navigate(['/main'])
          console.log('incident-report.component -> updateIncident -> success');
        },
        (error) => {
          console.log('incident-report.component -> updateIncident -> Error');
        }
      );
    }
  }
}
