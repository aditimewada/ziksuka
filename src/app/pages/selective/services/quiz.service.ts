import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import {Headers, RequestOptions} from '@angular/http';
// import { NbAuthService} from '@nebular/auth';
import {HeaderService} from '../../header.service';

@Injectable()
export class SelectiveQuizService {

  constructor(private http: Http, private auth: HeaderService) { }
  url = 'http://127.0.0.1:8000/learning/attempt/';
  get(url: string) {
    return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  }

  getAll() {
    return [
      { id: 'data/aspnet.json', name: 'Asp.Net' },
      { id: 'data/csharp.json', name: 'C Sharp' },
      { id: 'data/designPatterns.json', name: 'Design Patterns' },
    ];
  }
  // `http://localhost:8000/learning/selectiontest/3/`
  getQuest() {
     const authorization = 'JWT ' + this.auth.getToken();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': authorization});
    console.log('header', headers);
    const options = new RequestOptions({ headers: headers });
    return this.http.get('http://localhost:8000/learning/selectiontest/1/', options)
    .map((res: Response) => res.json());

  }
  answer(user) {
        // const text = 'JWT ';
        // const authorization = this.auth.getTokenName();
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
    //  this.quest = res._body;
    // this.quest.question = body.question;
    // this.quest.id = body.id;
    // this.quest.ability = body.ability;
    // this.quest.difficulty = body.difficulty;
    // this.quest.answer = body.answer;
    //  this.ch = body.choices.split('\r\n');
    //  this.quest.choices[0] = this.ch[0];
    console.log('response status-------->>>>' + JSON.stringify(body));

    // console.log('api response-------->>>>' + this.ch);
        return body || {} ;
       }
    private handleErrorObservable (error: Response | any) {
console.error(error.message || error);
return Observable.throw(error.message || error);
    }

}
