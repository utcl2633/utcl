import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  hideSideNav: boolean = false;

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
  }
}
