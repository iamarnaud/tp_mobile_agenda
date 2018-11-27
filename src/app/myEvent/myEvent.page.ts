import { Component, Output } from '@angular/core';

@Component({
  selector: 'app-myEvent',
  templateUrl: 'myEvent.page.html',
  styleUrls: ['myEvent.page.scss']
})
export class MyEventPage {
   private mine: boolean;
   ngOnInit() {
    this.setMine();
     
   }

   setMine() {
     this.mine = true;
   }
}
