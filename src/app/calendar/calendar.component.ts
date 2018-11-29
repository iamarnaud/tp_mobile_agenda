import { Component, OnInit, Input, Output } from '@angular/core';
import { EventService } from '../event.service';
import * as moment from 'moment';
import { AlertController, NavController } from '@ionic/angular';
import { EventEmitter } from 'events';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-calendar',
    templateUrl: './calendar.component.html',
    styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
    @Input() mine: boolean;

    user = 'cess'

    localeString: string = 'en';
    // obtenir la date du jour
    navDate: any;
    // liste des jours de la semaine
    days: Array<any> = [];
    dayNumber: Array<number> = [];

    events: Array<any> = [];
    navDateUTC: any


    comesToEvent: boolean;
    index: number;

    constructor(private eventService: EventService, private alertController: AlertController, private navCtrl: NavController) { }

    ngOnInit() {
        moment.locale(this.localeString);
        this.navDate = moment();
        this.navDateUTC =this.navDate.toISOString();
        this.makeWeekdaysHeader();
        this.makeGrid();
        this.getEvents();
       // console.log(this.navDate.toISOString())
    }

        
        

    getEvents(): void {
        // partie entre parenthèses => callback
        this.eventService.getAllEvents().subscribe(events => this.events = events);
    }
    deleteEvents(evtID, revision): void {
        // partie entre parenthèses => callback
        this.eventService.deleteEvent(evtID, revision).subscribe(data => { location.reload(); });
    }
    addParticipant(evtID, user, revision, form): void {
        // partie entre parenthèses => callback
        this.eventService.addComer(evtID, user, revision, form).subscribe(data => { location.reload(); });
    }
    removeParticipant(evtID, user, revision, form, index): void {
        // partie entre parenthèses => callback
        this.eventService.removeComer(evtID, user, revision, form, index).subscribe(data => { location.reload(); });
    }



    // Pour afficher une alerte avec infos event quand on clic dessus
    async infoEvent(evt) {
        for (let i = 0; i < evt.doc.participants.length; i++) {
            if (evt.doc.participants[i] === this.user) {
                this.index = i;
                this.comesToEvent = true
            } else {
                this.comesToEvent = false
            }

        }
        const time = moment(evt.doc.start_time).format('LT') + ' to ' + moment(evt.doc.end_time).format('LT');
        const location = '<br><b>Location: ' + evt.doc.location + '</b>';
        const going = '<br><br>You\'re going !';
        const notGoing = '<br><br>You\'re not going yet!';
        if (this.mine == true) {
            const alert = await this.alertController.create({
                header: evt.doc.title ,
                subHeader: time,
                message: evt.doc.description + location ,

                buttons: [{ text: 'Close' }, {
                    text: 'Delete',
                    role: 'delete',
                    cssClass: 'warning',
                    handler: () => {
                        this.deleteEvents(evt.doc._id, evt.doc._rev)
                    }
                }, {
                    text: 'Update',
                    role: 'update',
                    cssClass: 'warning',
                    handler: () => {

                        this.navCtrl.navigateForward(['/update'], true, { queryParams: { 'evtId': evt.doc._id } });
                    }
                }]
            }); await alert.present();
        } else if (evt.doc.participants.length === 0) {
            const alert = await this.alertController.create({
                header: evt.doc.title,
                subHeader: time,
                message: evt.doc.description + location + notGoing,

                buttons: [
                    { text: 'Close' },
                    {
                        text: 'I\'m going',
                        role: 'update',
                        handler: () => {
                            this.addParticipant(evt.doc._id, this.user, evt.doc._rev, evt.doc);

                            console.log(evt.doc)
                        }
                    }],

            }); await alert.present();
        } else {
            
            if (this.comesToEvent === true) {
                const alert = await this.alertController.create({
                    header: evt.doc.title,
                    subHeader: time,
                    message: evt.doc.description + location + going,

                    buttons: [
                        { text: 'Close' },
                        {
                            text: 'I\'m not going',
                            role: 'update',
                            handler: () => {
                                this.removeParticipant(evt.doc._id, this.user, evt.doc._rev, evt.doc, this.index)
                                console.log(evt.doc)
                            }
                        }
                    ],

                }); await alert.present();


            } else if (this.comesToEvent === false) {
                const alert = await this.alertController.create({
                    header: evt.doc.title,
                    subHeader: time,
                    message: evt.doc.description + location + notGoing,

                    buttons: [
                        { text: 'Close' },
                        {
                            text: 'I\'m going',
                            role: 'update',
                            handler: () => {
                                this.addParticipant(evt.doc._id, this.user, evt.doc._rev, evt.doc);

                                console.log(evt.doc)
                            }
                        }],

                }); await alert.present();




            }
        }

    }

    // numToChange indique s'il faut augmenter ou diminuer (dans html -1 / 1 param 1)
    changeNavMonth(numToChange, datePart) {
        this.navDate.add(numToChange, 'month');
        this.makeGrid();
        this.getEvents();

    }

    // Pour limiter le calendrier dans le temps
    canChangeNavMonth(numToChange: number): boolean {
        const clonedDate = moment(this.navDate);
        clonedDate.add(numToChange, 'month');
        const minDate = moment().add(-4, 'month');
        const maxDate = moment().add(12, 'month');
        return clonedDate.isBetween(minDate, maxDate);
    }

    // Pour obtenir les jours de la semaine
    makeWeekdaysHeader() {
        const weekDaysArr: Array<number> = [0, 1, 2, 3, 4, 5, 6];
        weekDaysArr.forEach(day => this.days.push(moment().weekday(day).format('ddd')));
    }

    // Pour remplir la grille du calendrier
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
        }
    }

    isAvailable(num: number) {
        if (num === 5) {
            return false;
        } else {
            return true;
        }
    }


}
