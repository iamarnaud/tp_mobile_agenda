import { Component, OnInit, Output, Input } from '@angular/core'
import { EventService } from '../event.service'
import { ActivatedRoute } from '@angular/router'

@Component({
    selector: 'app-update',
    templateUrl: './update.page.html',
    styleUrls: ['./update.page.scss']
})
export class UpdatePage implements OnInit {
  evt: Array<any> = [];
  user = "cess";

    constructor(
        private eventService: EventService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
      const id = this.activatedRoute.snapshot.queryParamMap.get('evtId')
      console.log(id)
      this.getEvent(id)
      
    }
  updateEvent(docId, revision, f): void {
    console.log(f.value)
    f.value.user = this.user;
    
        // partie entre parenthèses => callback
    this.eventService
      .updateEvent(docId, revision, f.value)
          .subscribe(event => (this.evt = event))
      console.log(this.evt)
        location.reload()
    }
    getEvent(evtID): void {
      this.eventService.getEvent(evtID).subscribe(evt => (this.evt = evt))
      console.log(this.evt)

    }
}
