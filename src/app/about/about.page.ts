import { Component,OnInit } from '@angular/core';
import * as moment from 'moment';
import { Eventa } from '../event';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage implements OnInit {
  now: any;
 // evt: Eventa[];
  constructor(private eventService: EventService) { }

  ngOnInit(){
    this.setNow()
  }
  setNow() {
    this.now = moment().format() ;
    console.log(this.now);
  }

  
  addEvent(f) {
    console.log(f.value)
    let idGenerate = f.value.title+moment(this.now).format('MM YYYY dd SSS')+'generate';
    f.value._id = Md5.hashStr(idGenerate);//unique id

    
    if (!f.value.title || !f.value.description || !f.value.end_time || !f.value.start_time || !f.value.location) { return; }

    this.eventService.addEvent(f.value);
    console.log(f.value._id)
  }
  

}
