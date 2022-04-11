import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.scss'],
})
export class ReplyFormComponent implements OnInit {
  @ViewChild('message') message: ElementRef;
  @Input('postId') postId: number;
  constructor(private _postService: PostService) {}

  ngOnInit(): void {}

  addComment() {
    this._postService
      .addComment({
        comment: this.message.nativeElement.value,
        id: this.postId,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
