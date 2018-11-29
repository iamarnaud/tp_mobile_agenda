import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { EventService } from '../event.service';
import { AlertController, NavController } from '@ionic/angular';


@Component({
  selector: 'app-addEvent',
  templateUrl: 'addEvent.page.html',
  styleUrls: ['addEvent.page.scss']
})
export class AddEventPage implements OnInit {
  now: any;
  user = 'cess';

  constructor(private eventService: EventService, private alertController: AlertController, private navCtrl: NavController) { }

  ngOnInit() {
    this.setNow()
  }

  setNow() {
    this.now = moment().format();
    return this.now;
  }

  async addEvent(f) {
    f.value.user = this.user;
    f.value.participants = [];
    if (!f.value.user) {
      const alert = await this.alertController.create({
        header: 'Log in needed',
        message: 'You need to be logged in to add an event!',
        buttons: ['Close']
      });
      await alert.present();;
    }
    if (!f.value.title || !f.value.description || !f.value.end_time || !f.value.start_time || !f.value.location ) {
      const alert = await this.alertController.create({
        header: 'Missing data',
        message: 'You need to fill all fields for your event to be added',
        buttons: ['Close']
      });
      await alert.present();
    } else if (f.value.user){
      
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
            location.reload();
          }
        }]
      });
      await alert.present();;
    }
  }
}
