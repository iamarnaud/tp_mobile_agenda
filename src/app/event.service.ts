import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// username and pwd needed to work on db (cud)
const username = 'pagenda_cess';
const password = 'pagendacess';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Basic ' + btoa(`${username}:${password}`) })
};

@Injectable({
    providedIn: 'root'
})
export class EventService {
    
    private connectionUrl = 'https://pagenda.alwaysdata.net/data/pagenda_calendar/_all_docs?include_docs=true';
    // Couhdb API CALL to create document
    private addUrl = 'https://pagenda.alwaysdata.net/data/pagenda_calendar/';
    constructor(private http: HttpClient) { }

    getAllEvents(): Observable<any> {
        return this.http.get<any>(this.connectionUrl);
    }
    addEvent(evt: object): Observable<any> {
        return this.http.post<Response>(this.addUrl, evt, httpOptions);
    }
    deleteEvent(docId, revision): Observable<any> {
        return this.http.delete('https://pagenda.alwaysdata.net/data/pagenda_calendar/'+docId+'?rev='+revision, httpOptions)
    }
    updateEvent(docId): Observable<any> {
        return this.http.put('https://pagenda.alwaysdata.net/data/pagenda_calendar/'+docId, httpOptions)
    }
}
