import { map } from 'rxjs/operators';
import { SocketioService } from './../../socketio.service';
import { LikeDislike } from './../user-interface/likedislike';
import { PostService } from './../post.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as _moment from 'moment';
import { Observable } from 'rxjs';
import { Post, PostList } from '../user-interface/Post';

@Component({
  selector: 'app-user-landing',
  templateUrl: './user-landing.component.html',
  styleUrls: ['./user-landing.component.scss'],
})
export class UserLandingComponent implements OnInit {
  postList: any = [];
  postList$: Observable<any>;
  value: Array<string> = [];
  postCount: number;
  limit: number = 10;
  currentPage: number = 0;
  @ViewChild('searchField') searchField: ElementRef;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _postService: PostService,
    private _socketService: SocketioService
  ) {}

  ngOnInit(): void {
    //this.postList$ = this._postService.postList$;
    this.getAllPost();
    this.value = ['Avinash', 'Abhishek'];
    this._socketService.setupSocketConnection();
    this._socketService.socket.on('likeUpdated', (data: string) => {
      this.postList.map((post) => {
        if (data['_id'] === post['_id']) {
          post['likes'] = data['likes'];
        }
      });
    });
  }

  getAllPost() {
    console.log(this.postList$);
    this._postService
      .getAllPost(
        { limit: this.limit, currentPage: this.currentPage },
        this.searchField && this.searchField.nativeElement.value
          ? { searchParam: this.searchField.nativeElement.value }
          : null
      )
      .subscribe((response: PostList) => {
        this._postService.setPostList(response);
        this.postList = response['data'];
      });
  }

  likePost(type: string, postId: number, userId: number): void {
    let body: LikeDislike = {
      id: postId,
      userId: userId,
    };
    if (type === 'like') {
      this._postService.likePost(body).subscribe((response) => {
        console.log(response);
      });
    } else {
      this._postService.dislikePost(body).subscribe((response) => {
        console.log(response);
      });
    }
  }

  trackByPostId(post) {
    return post._id;
  }

  changeValue() {
    this.value.push('a');
  }

  onPaginate(event) {
    console.log(event);
    this.currentPage = event.pageIndex;
    this.getAllPost();
  }

  onSearch() {
    this.limit = 10;
    this.currentPage = 0;
    console.log(this.searchField.nativeElement.value);
    this.getAllPost();
  }

  onReset() {
    this.limit = 10;
    this.currentPage = 0;
    this.searchField.nativeElement.value = null;
    this.getAllPost();
  }
}
