import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the RealtimedbProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RealtimedbProvider {
  remote: string;
  db: any;
  data: any;
  firtsConnection: boolean = true;

  constructor(public http: Http) {
    console.log('Hello RealtimedbProvider Provider');
  }


  init(ref: string) {
    this.db = new PouchDB(ref);

    this.remote = 'http://localhost:5984/' + ref;

    let options = {
      live: true,
      retry: true,
      continuous: true
    };

    this.db.sync(this.remote, options);





  }


  list(): Observable<any> {
    return new Observable(obs => {
      this.db.allDocs({ include_docs: true }).then(
        (result) => {
          this.data = [];
          let docs = result.rows.map((row) => {
            this.data.push(row.doc);
          });
          obs.next(this.data);
        }
      )
      this.db.changes({ live: true, since: 'now', include_docs: true }).on('change', (change) => {
        if (change.deleted) {
          this.db.allDocs({ include_docs: true }).then(
            (result) => {
              this.data = [];
              let docs = result.rows.map((row) => {
                this.data.push(row.doc);
              });
              obs.next(this.data);
            }
          )
        } else {
          this.data.push(change.doc);
          obs.next(this.data);
        }
      });
    })
  }

  post(data: object) {
    this.db.post(data)
  }

  put(data: object) {
    this.db.put(data).catch((err) => {
      console.log(err);
    });
  }

  remove(data) {
    this.db.remove(data).catch((err) => {
      console.log(err);
    });
  }

}
