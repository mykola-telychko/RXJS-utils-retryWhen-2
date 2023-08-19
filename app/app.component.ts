import { Component, OnInit } from '@angular/core';
import { catchError, retryWhen  } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { genericRetryStrategy } from './rxjs-utils';
import { AppService } from './app.service';
screenLog.init()

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {
  constructor(private _appService: AppService) {}

  ngOnInit() {
    this._appService
      .getData(500)
      .pipe(
        retryWhen(genericRetryStrategy()),
        catchError(error => of(error))
      )
      .subscribe(console.log);

    // excluding status code, delay for logging clarity
    setTimeout(() => {
    this._appService
      .getData(500)
      .pipe(
        retryWhen(genericRetryStrategy({
          scalingDuration: 2000, 
          excludedStatusCodes: [500]
        })),
        catchError(error => of(error))
      )
      .subscribe(e => console.log('Exluded code:', e.status));

    }, 8000);
  }
}
