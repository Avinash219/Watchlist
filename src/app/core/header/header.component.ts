import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthenticateService } from './../../authenticate/authenticate.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedInUserName: string;
  constructor(private _auth: AuthenticateService, private _router: Router) {}

  ngOnInit(): void {
    this._auth.getLoggedInUser().subscribe((response) => {
      this.loggedInUserName = response ? response['name'] : null;
    });
  }

  logout() {
    localStorage.removeItem('userInfo');
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    this._auth.setLoggedInUser(null);
    this._auth.loggedIn = false;
    this._router.navigate(['']);
  }
}
