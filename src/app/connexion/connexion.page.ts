import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Storage } from '@ionic/storage'

@Component({
    selector: 'app-connexion',
    templateUrl: './connexion.page.html',
    styleUrls: ['./connexion.page.scss']
})
export class ConnexionPage implements OnInit {
    email: string
    error = ''
    regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    constructor(private router: Router, private storage: Storage) {}

    ngOnInit() {}

    connexion() {
        if (this.regexEmail.test(this.email)) {
            // stores email in session 
            this.storage.set('user', this.email)
            this.router.navigateByUrl('/app/tabs/(home:home)')
        } else {
            this.error = 'Invalid email ! '
        }
    }
}
