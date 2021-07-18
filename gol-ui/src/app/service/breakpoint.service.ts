import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {}

  getIsHandset$() {
    return this.breakpointObserver.observe(Breakpoints.Handset).pipe(
      map((result) => result.matches),
      //shareReplay()
    );
  }
}
