import { Component, OnInit, Output, Input } from '@angular/core'
import { EventService } from '../event.service'
import { ActivatedRoute } from '@angular/router'
import { AlertController, NavController } from '@ionic/angular'
import { Storage } from '@ionic/storage';

@Component({
    selector: 'app-update',
    templateUrl: './update.page.html',
    styleUrls: ['./update.page.scss']
})
export class UpdatePage implements OnInit {
    public evt: any = [];
    currentUser: string;

    constructor(
        private eventService: EventService,
        private activatedRoute: ActivatedRoute,
        private navCtrl: NavController,
        private alertCtrl: AlertController,
        private storage: Storage
    ) { }
    ngOnInit() {
        const id = this.activatedRoute.snapshot.queryParamMap.get('evtId');
        this.getEvent(id);
        this.storage.get('user').then(val => {
            this.currentUser = val
        })
    }
    async updateEvent(docId, revision, f) {
        f.value.user = this.currentUser;
        f.value.participants = this.evt.participants;
        f.value._id = this.evt._id;
        f.value._rev = this.evt._rev;

        // partie entre parenthèses => callback
        this.eventService
            .updateEvent(docId, revision, f.value)
            .subscribe(data => {
                this.navCtrl.navigateBack('app/tabs/(myEvent:myEvent)')
            })
        const alert = await this.alertCtrl.create({
            header: 'Success',
            subHeader: 'Event updated successfully!',
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

    getEvent(evtID): void {
        this.eventService.getEvent(evtID).subscribe(evt => (this.evt = evt))
    }
}
