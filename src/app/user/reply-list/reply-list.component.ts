import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-reply-list',
  templateUrl: './reply-list.component.html',
  styleUrls: ['./reply-list.component.scss'],
})
export class ReplyListComponent implements OnInit {
  @Input('postId') postId: number;
  commentList$: Observable<any>;
  constructor(private _postService: PostService) {}

  ngOnInit(): void {
    this.getCommentList();
  }

  getCommentList() {
    this.commentList$ = this._postService.getComment(this.postId);
  }
}
