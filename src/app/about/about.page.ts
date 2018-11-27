import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Eventa } from '../event';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { AlertController, NavController } from '@ionic/angular';
import { Location } from '@angular/common';


@Component({
  selector: 'app-about',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutPage implements OnInit {
  now: any;

  constructor(private eventService: EventService, private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    this.setNow()
  }

  setNow() {
    this.now = moment().format();
    return this.now;
  }

  async addEvent(f) {

    if (!f.value.title || !f.value.description || !f.value.end_time || !f.value.start_time || !f.value.location) {
      const alert = await this.alertController.create({
        header: 'Missing data',
        message: 'You need to fill all fields for your event to be added',
        buttons: ['Close']
      });
      await alert.present();;
    } else {

      this.eventService.addEvent(f.value).subscribe(data => {
        this.navCtrl.navigateRoot('/');
      }
      );
      const alert = await this.alertController.create({
        header: 'Success',
        subHeader: 'Event added successfully!',
        message: "Don't forget to tell your friends!",
        buttons: [{
          text: 'Close',
          handler: () => {
            window.location.reload();
          }
        }]
      });
      await alert.present();;
    }
  }
}
