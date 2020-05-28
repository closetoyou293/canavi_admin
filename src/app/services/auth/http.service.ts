
import { Injectable, Inject } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable, pipe } from 'rxjs';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpService {

    constructor(public http: HttpClient,
        @Inject('BASE_URL') public baseURL: string,
        private oauthService: OAuthService) { }

    public get(path: string, cache: boolean = false, parameters?: Map<string, string>): Observable<any> {

        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        let params = new HttpParams();

        if (parameters) {
            parameters.forEach((value: string, key: string) => {
                params = params.append(key, value);
            });
        }

        return this.http.get(path, { headers: headers, params: params }).pipe(
            catchError(this.httpError)
         );
    }

    public post(path: string, postBody: any, multipart?: boolean): Observable<any> {

        const headers = new HttpHeaders();

        if (multipart === true) {
            // header.append('Content-Type', 'multipart/form-data');
        } else {
            headers.set('Content-Type', 'application/json');
        }

        return this.http.post(path, postBody, { headers: headers }).pipe(
            catchError(this.httpError)
         );
    }

    public put(path: string, putBody: any): Observable<any> {

        const headers = new HttpHeaders().set('Content-Type', 'application/json');

        return this.http.put(path, putBody, { headers: headers }).pipe(
            catchError(this.httpError)
         );

    }

    public patch(path: string, patchBody: any, multipart?: boolean): Observable<any> {

        const headers = new HttpHeaders();
        const params = new HttpParams();

        if (multipart === true) {
            // header.append('Content-Type', 'multipart/form-data');
        } else {
            headers.set('Content-Type', 'application/json');
        }

        return this.http.patch(path, patchBody, { headers: headers }).pipe(
            catchError(this.httpError)
         );

    }

    private httpError(res: HttpErrorResponse | any) {
        let errMsg: string;
        if (res instanceof Response) {
            errMsg = res.status.toString();
        } else {
            errMsg = res.message ? res.message : res.toString();
        }
        if (res && res._body) {
            try {
                const error: any = JSON.parse(res._body);
                return throwError({
                    message: error.message,
                    userFriendlyMessage: error.userFriendlyMessage,
                    stack: error.stack,
                    response: res
                });

            } catch (e) { }
        }

        return throwError({
            message: 'Unknown error!',
            userFriendlyMessage: 'Request to API failed. Please contact system administrator.',
            stack: null,
            response: res
        });
    }
}
