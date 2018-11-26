import { Component,OnInit } from '@angular/core';
import * as moment from 'moment';
import { Eventa } from '../event';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
//import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage implements OnInit {
  now: any;
  calendarMaxDate: any;
 // evt: Eventa[];
  constructor(private eventService: EventService) { }

  ngOnInit(){
    this.setNow()
    this.setCalendarMaxDate();
  }

  setNow() {
    this.now = moment().format() ;
    return this.now;
  }
  setCalendarMaxDate() {
    this.calendarMaxDate = moment().add(10, 'y').format();
    return this.calendarMaxDate;
  }

  
  addEvent(f) {
    console.log(f.value)
    
    if (!f.value.title || !f.value.description || !f.value.end_time || !f.value.start_time || !f.value.location) { return; }

    this.eventService.addEvent(f.value);
    
  }
  

}
