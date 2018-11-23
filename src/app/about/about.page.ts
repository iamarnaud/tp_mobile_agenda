import { Component,OnInit } from '@angular/core';
import * as moment from 'moment';
import { Eventa } from '../event';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage implements OnInit {
  now: any;
  events: Eventa[];
  constructor(private eventService: EventService) { }

  ngOnInit(){
    this.setNow()
  }
  setNow() {
    this.now = moment().format() ;
    console.log(this.now);
  }

  
  addEvent(title: string, description: string, start_time: any, end_time: any, location: string): void {
    title = title.trim();
    description = description.trim();
    start_time = start_time.trim();
    end_time = end_time.trim();
    location = location.trim();
    if (!title || !description || !end_time || !start_time || !location) { return; }
    this.eventService.addEvent({ title, description, start_time, end_time, location } as Eventa);
  }
  

}
