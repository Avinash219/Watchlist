import { AdminService } from './../admin.service';
import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.scss'],
})
export class AdminLandingComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
