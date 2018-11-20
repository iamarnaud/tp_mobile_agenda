import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
    localeString: string = 'fr';
    // gets todays date
    navDate: any;

    ngOnInit() {
        moment.locale(this.localeString);
        this.navDate = moment();
    }

    // numToChange indique s'il faut augmenter ou diminuer (dans html -1 / 1 param 1)
    changeNavMonth(numToChange: number) {
        // si view date est bien dans l'interval des dates que l'on a défini
        if (this.canChangeNavMonth(numToChange)) {
            this.navDate.add(numToChange, 'month');
        }
    }

    // to limit calendar range
    canChangeNavMonth(numToChange: number): boolean {
        const clonedDate = moment(this.navDate);
        clonedDate.add(numToChange, 'month');
        const minDate = moment().add(-1, 'month');
        const maxDate = moment().add(1, 'month');
        // is between => moment method
        return clonedDate.isBetween(minDate, maxDate);

    }
}
