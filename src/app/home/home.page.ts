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
    // partToChange indique la partie à changer ici le mois (dasn html param 2)
    changeNavMonth(numToChange, partToChange) {
        // si view date est bien dans l'interval des dates que l'on a défini
        if (this.canChangeNavMonth(this.navDate, numToChange, partToChange)) {
            this.navDate.add(numToChange, partToChange);
        }
    }

    // to limit calendar range
    canChangeNavMonth(dateToCHeck, numToChange, partToChange) {
        const clonedDate = moment(dateToCHeck);
        clonedDate.add(numToChange, partToChange);
        const minDate = moment().add(-12, 'month');
        const maxDate = moment().add(12, 'month');

        return clonedDate.isBetween(minDate, maxDate);

    }
}
