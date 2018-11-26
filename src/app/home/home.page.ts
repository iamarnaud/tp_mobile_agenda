import { Component, OnInit } from '@angular/core';
import { Eventa } from '../event';

import { EventService} from '../event.service';
import * as moment from 'moment';
import { AlertController} from '@ionic/angular';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {

  localeString: string = 'en';
  // obtenir la date du jour
  navDate: any;
  // liste des jours de la semaine
  days: Array<any> = [];
  dayNumber: Array<number> = [];

  events: Array<any> = [];

  constructor(private eventService: EventService, private alertController: AlertController) { }

  ngOnInit() {
      moment.locale(this.localeString);
      this.navDate = moment();
      this.makeWeekdaysHeader();
      this.makeGrid();
      this.getEvents();
  }

  getEvents(): void {
      // partie entre parenthèses => callback
      this.eventService.getAllEvents().subscribe(events => this.events = events);
  }
  // Pour afficher une alerte avec infos event quand on clic dessus
  async infoEvent(evt) {
      const time = moment(evt.doc.start_time).format('LT') + ' to ' + moment(evt.doc.end_time).format('LT');
      const alert = await this.alertController.create({
          header: evt.doc.title,
          subHeader: time,
          message: evt.doc.description,
          buttons: ['FERMER']
      });
      await alert.present();
  }

  // numToChange indique s'il faut augmenter ou diminuer (dans html -1 / 1 param 1)
  changeNavMonth(numToChange, datePart) {
      this.navDate.add(numToChange, 'month');
      this.makeGrid();
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
          if (i < initialEmptyCells || i > initialEmptyCells + daysInMonth -1) {
              obj.value = 0;
              obj.available = false;
          } else {
              obj.value = i - initialEmptyCells +1;
              obj.available = this.isAvailable(i - initialEmptyCells +1);
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
