import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
 selector: 'app-connexion',
 templateUrl: './connexion.page.html',
 styleUrls: ['./connexion.page.scss'],
})

export class ConnexionPage implements OnInit {
 user = 'a@a.fr';
 email = '';
 error = '';

 constructor (private router: Router) { }

 ngOnInit() {
 }

 connexion() {
     if (this.user === this.email) {
         this.router.navigateByUrl('/app/tabs/(home:home)');
     } else {
         this.error = 'non non c\'est pas bon!';
     }
 }
}
