import { Injectable } from '@angular/core';
import { Response, Headers } from '@angular/http';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { delay, mergeMap } from 'rxjs/operators';

@Injectable()
export class AppService {
  getData(status: number) {
    return _throw({status});
  }
}