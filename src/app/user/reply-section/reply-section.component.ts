import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-reply-section',
  templateUrl: './reply-section.component.html',
  styleUrls: ['./reply-section.component.scss'],
})
export class ReplySectionComponent implements OnInit {
  @Input('postId') postId: number;
  constructor() {}

  ngOnInit(): void {}
}
