import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Eventa } from './event';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
    providedIn: 'root'
})
export class EventService {
    private connectionUrl = 'https://pagenda.alwaysdata.net/data/pagenda_calendar/_all_docs?include_docs=true';
    private addUrl = 'https://pagenda.alwaysdata.net/data/_utils/#/database/pagenda_calendar/new';
    constructor(private http: HttpClient) { }


    getAllEvents(): Observable<any> {
        return this.http.get<any>(this.connectionUrl);
    }
    addEvent(evt: any): Observable<any> {
        return this.http.post<any>(this.addUrl, evt);
    }

}
