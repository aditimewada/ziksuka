import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
// import {NbAuthService} from '@Nebular/auth';
import {HeaderService} from '../../../header.service';

@Injectable()
export class ContentService {

  constructor(private http: Http, private auth: HeaderService) { }
getUrl = 'http://127.0.0.1:8000/learning/contents/';
  // get(url: string) {
  //   return this.http.get(url).map(res => res.text().length > 0 ? res.json() : null);
  // }

  // getAll() {
  //   return [
  //     { id: 'data/aspnet.json', name: 'Asp.Net' },
  //     { id: 'data/csharp.json', name: 'C Sharp' },
  //     { id: 'data/designPatterns.json', name: 'Design Patterns' },
  //   ];
  // }
  getContents() {
    const authorization = 'JWT ' + this.auth.getToken();
    const headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': authorization});
    console.log('header', headers);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.getUrl, options)
    .map((res: Response) => res.json());

  }

}
