import { Component, ChangeDetectionStrategy,
  OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ConfigService } from '../../core';
import { AuthService, AuthOptions } from '../shared';

@Component({
  selector: 'igo-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.styl'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AuthFormComponent implements OnInit {

  @Input()
  get alreadyConnectedDiv(): boolean {
    return this._alreadyConnectedDiv;
  }
  set alreadyConnectedDiv(value: boolean ) {
    this._alreadyConnectedDiv = value.toString() === 'true';
  }
  private _alreadyConnectedDiv: boolean = false;

  @Input()
  get backgroundDisable(): boolean {
    return this._backgroundDisable;
  }
  set backgroundDisable(value: boolean) {
    this._backgroundDisable = value.toString() === 'true';
  }
  private _backgroundDisable: boolean = true;

  private options: AuthOptions;
  private user;

  constructor(
    public auth: AuthService,
    private config: ConfigService,
    private router: Router
  ) {
    this.options = this.config.getConfig('auth') || {};

    if (this.auth.decodeToken()) {
        this.user = {
          name: this.auth.decodeToken().user.sourceId
        };
    }
  }

  public ngOnInit() {
    this.analyzeRoute();
  }

  protected login() {
    this.auth.goToRedirectUrl();
  }

  protected logout() {
    this.auth.logout().subscribe(() => {
      if (this.options.loginRoute) {
        this.router.navigate([this.options.loginRoute]);
      }
    });
  }

  private analyzeRoute() {
    const logoutRoute = this.options.logoutRoute;
    const loginRoute = this.options.loginRoute;
    const currentRoute = this.router.url;

    const isLogoutRoute: boolean = currentRoute === logoutRoute;
    const isLoginRoute: boolean = currentRoute === loginRoute;

    if (isLogoutRoute) {
      this.logout();
    } else if (isLoginRoute) {
      this.backgroundDisable = false;
      this.alreadyConnectedDiv = true;
    }
  }
}