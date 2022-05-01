import {Injectable} from '@angular/core';
import {filter, map, Observable} from "rxjs";
import {ResolveStart, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor(private router: Router) {
  }

  /**
   * Get Data from current component route if it is lazy loaded
   * Source: https://lifesaver.codes/answer/router-s-activatedroute-data-returns-empty-%7B%7D-if-module-is-lazy-19420
   */
  getRouterData(): Observable<any> {
    return this.router.events.pipe(
      filter(event => event instanceof ResolveStart),
      map(event => {
        let data = null;
        // @ts-ignore
        let route = event['state'].root;

        while (route) {
          data = route.data || data;
          route = route.firstChild;
        }

        return data;
      }),
    );
  }
}
