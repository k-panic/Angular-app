import { HttpClient } from '@angular/common/http';
import { map, filter, catchError, mapTo } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    database: string = 'http://node-image:3000/users';

    constructor(private http: HttpClient){}

    login(email: string, password: string) {
        return this.http.get<{userId: string, token: string}>(this.database).pipe(
            mapTo(data => of(data)),
            catchError(error => of({ error: error }))
        );
    }

    register(email: string, password: string) {
        return this.http.post<{ email: string }>(this.database, {
            email: email,
            password: password,
        }).pipe(
            catchError(error => of({ error }))
        );
    }


}