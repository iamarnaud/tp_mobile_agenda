import { Component, OnInit } from '@angular/core';
import { Eventa } from '../event';
import { EventService } from '../event.service';
import * as moment from 'moment';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})



export class HomePage implements OnInit {
    localeString: string = 'en';
    // gets todays date
    navDate: any;
    // lists days of week
    days: Array<any> = [];
    dayNumber: Array<number> = [];


    events: Array<any> = [];

    constructor(private eventService: EventService, private alertCtrl: AlertController) {
    }

    ngOnInit() {
        moment.locale(this.localeString);
        this.navDate = moment();
        // populates days array
        this.makeWeekdaysHeader();
        this.makeGrid();
        this.getEvents();
    }

    getEvents(): void {
        // partie entre parenthèses => callback
        this.eventService.getAllEvents().subscribe(events => this.events = events);
    }
   async showEvt(evt) {
       const time = moment(evt.doc.start_time).format('LT')+' à '+moment(evt.doc.end_time).format('LT');
      const alert =  await this.alertCtrl.create({

            header: evt.doc.title,
            subHeader: time,
            message: evt.doc.description,
            buttons: ['OK']
        });

        await alert.present();
    }

    // numToChange indique s'il faut augmenter ou diminuer (dans html -1 / 1 param 1)
    changeNavMonth(numToChange: number) {
        // si view date est bien dans l'interval des dates que l'on a défini
        // if (this.canChangeNavMonth(numToChange)) {
        this.navDate.add(numToChange, 'month');
        this.makeGrid();
        // }
    }

    // to limit calendar range
    canChangeNavMonth(numToChange: number): boolean {
        const clonedDate = moment(this.navDate);
        clonedDate.add(numToChange, 'month');
        const minDate = moment().add(-4, 'month');
        const maxDate = moment().add(12, 'month');
        // is between => moment method
        return clonedDate.isBetween(minDate, maxDate);

    }
    // to get weekdays
    makeWeekdaysHeader() {
        const weekDaysArr: Array<number> = [0, 1, 2, 3, 4, 5, 6];
        weekDaysArr.forEach(day => this.days.push(moment().weekday(day).format('ddd')));
    }
    makeGrid() {
        this.dayNumber = [];

        const firstDayDate = moment(this.navDate).startOf('month');
        const initialEmptyCells = firstDayDate.weekday();
        // calculates how many empty cells we need to print before printing numbers:
        const lastDayDate = moment(this.navDate).endOf('month');
        // calculates how many empty cells the array contains at the end 
        const lastEmptyCells = 6 - lastDayDate.weekday();
        const daysInMonth = this.navDate.daysInMonth();
        const arrayLength = initialEmptyCells + lastEmptyCells + daysInMonth;

        for (let i = 0; i < arrayLength; i++) {
            let obj: any = {};
            if (i < initialEmptyCells || i > initialEmptyCells + daysInMonth - 1) {
                obj.value = 0;
                obj.available = false;
            } else {
                obj.value = i - initialEmptyCells + 1;
                obj.available = this.isAvailable(i - initialEmptyCells + 1);
                obj.month = moment().format('MMMM');
                obj.year = moment().year();
            }
            this.dayNumber.push(obj);
        } console.log(this.dayNumber);
    }
    isAvailable(num: number) {
        if (num === 5) {
            return false;
        } else {
            return true;
        }
    }


}
