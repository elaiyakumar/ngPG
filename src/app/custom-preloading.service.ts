import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomPreloadingService implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    if (route.data && route.data['preload']) {
      return fn();
    // If data property does not exist or preload property is set to
    // false, then return Observable of null, so the module is not
    // preloaded in the background
    } else {
      return of(null);
    }
  } 

  constructor() { }
}
