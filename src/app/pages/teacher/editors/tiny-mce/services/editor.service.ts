import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {QuestionPost} from '../models/question';
// import {NbAuthService} from '@Nebular/auth';
import {HeaderService} from '../../../../header.service';

@Injectable()
export class QuestionService {
    url = 'http://localhost:8000/learning/questions/';
    getUrl = 'http://127.0.0.1:8000/learning/contents/';
    private question = new QuestionPost();
    constructor(private http: Http, private auth: HeaderService) {}

    start(user) {
        const text = '';
        // let user = User
        const users = JSON.stringify(user);
        console.log('__users___' + users);
        const authorization = 'JWT ' + this.auth.getToken();
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': authorization});
        console.log('header', headers);
        const options = new RequestOptions({ headers: headers });
        console.log('Options' + options);
        return this.http.post(this.url, users, options)
                   .map(this.extractData)
                   .catch(this.handleErrorObservable);
            }

    private extractData(res: any) {
    const body = res.json();

        return body || {} ;
       }
    private handleErrorObservable (error: Response | any) {
console.error(error.message || error);
return Observable.throw(error.message || error);
    }
     getContents() {
    const authorization = 'JWT ' + this.auth.getToken();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': authorization});
    console.log('header', headers);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.getUrl, options)
    .map((res: Response) => res.json());

  }
  getQuestions(url) {
    const authorization = 'JWT ' + this.auth.getToken();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': authorization});
    console.log('header', headers);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url, options)
    .map((res: Response) => res.json());

  }

  putQuestion(user) {
        const text = '';
        // let user = User
        const users = JSON.stringify(user);
        console.log('__users___' + users);
        const authorization = 'JWT ' + this.auth.getToken();
        const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': authorization});
        console.log('header', headers);
        const options = new RequestOptions({ headers: headers });
        console.log('Options' + options);
        return this.http.put(this.url, users, options)
                   .map(this.extractData)
                   .catch(this.handleErrorObservable);
            }


}
