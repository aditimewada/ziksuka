import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class ContentService {

  constructor(private http: Http) { }
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
    return this.http.get(this.getUrl)
    .map((res: Response) => res.json());

  }

}
