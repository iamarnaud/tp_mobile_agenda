import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';


@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {
    private mine: boolean;
    constructor() { }
    ngOnChanges() {
        this.setMine();

    }
    ngOnInit(){
        this.setMine();
    }
    setMine() {
        this.mine = false;
      }
}
