import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import {Headers, RequestOptions} from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {User} from '../models/user';
import {Questions} from '../models/questions';
import {Choice} from '../models/choice';
// import {NbAuthService} from '@Nebular/auth';
import {HeaderService} from '../../header.service';


@Injectable()
export class UserService {
    url = 'http://127.0.0.1:8000/learning/adaptive_test/1/ ';
    private quest = new Questions();
    private ch = new Choice(null);
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
     this.quest = res._body;
    // this.quest.question = body.question;
    // this.quest.id = body.id;
    // this.quest.ability = body.ability;
    // this.quest.difficulty = body.difficulty;
    // this.quest.answer = body.answer;
     this.ch = body.choices.split('\r\n');
    //  this.quest.choices[0] = this.ch[0];
    console.log('response status-------->>>>' + JSON.stringify(body));

    console.log('api response-------->>>>' + this.ch);
        return body || {} ;
       }
    private handleErrorObservable (error: Response | any) {
console.error(error.message || error);
return Observable.throw(error.message || error);
    }
    }

