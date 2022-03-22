import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserMenuComponent implements OnInit {
  @Input('value') childValue: Array<string>;

  links: Array<Object> = [
    { link: 'All', path: 'all' },
    { link: 'Edit Profile', path: '../profile' },
    { link: 'Express Your Idea', path: '../idea' },
  ];
  constructor() {}

  ngOnInit(): void {
    console.log(this.childValue);
  }

  ngOnChanges(change: SimpleChanges) {
    console.log(change);
  }
}
