import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  // user = {};

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  // constructor(private sidebarService: NbSidebarService,
  //             private menuService: NbMenuService,
  //             private userService: UserService,
  //             private analyticsService: AnalyticsService) {
  // }

  constructor(private authService: NbAuthService,
              private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService) {

    // this.authService.onTokenChange()
    //   .subscribe((token: NbAuthJWTToken) => {

    //     if (token !== null) {
    //       // this.user = token.getPayload();
    //       console.log(this.user);
    //       // here we receive a payload from the token and assigne it to our `user` variable
    //     }

    //   });
  }

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);
      this.user = localStorage.getItem('username');
      console.log('username', this.user);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
