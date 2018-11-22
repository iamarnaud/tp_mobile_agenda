import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Eventa } from './event';


@Injectable({
    providedIn: 'root'
})
export class EventService {
    private connectionUrl = 'https://pagenda.alwaysdata.net/data/pagenda_calendar/_all_docs?include_docs=true';

    constructor(private http: HttpClient) { }


    getAllEvents(): Observable<Eventa[]> {
        return this.http.get<Eventa[]>(this.connectionUrl);
    }
}

