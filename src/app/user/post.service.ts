import { PostRouteConstant } from './post-route.constant';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postList$ = new BehaviorSubject([]);

  constructor(private _http: HttpClient) {}

  getAllPost(body?, searchParam?, reset: string = 'new') {
    const headers = new HttpHeaders().set('reset', reset);
    const { limit, currentPage } = body;

    return this._http.post(
      `${PostRouteConstant.GET_POST_LIST}${limit}&currentPage=${currentPage}`,
      searchParam,
      {
        headers: headers,
      }
    );
  }

  createPost(body) {
    return this._http.post(`${PostRouteConstant.CREATE_POST}`, body);
  }

  likePost(body) {
    return this._http.put(`${PostRouteConstant.LIKE_POST}`, body);
  }

  dislikePost(body) {
    return this._http.put(`${PostRouteConstant.DISLIKE_POST}`, body);
  }

  setPostList(post) {
    this.postList$.next(post);
  }

  getPostList() {
    return this.postList$.asObservable();
  }

  addComment(body) {
    return this._http.put(`${PostRouteConstant.ADD_COMMENT}`, body);
  }

  getComment(id) {
    return this._http.get(`${PostRouteConstant.GET_COMMENT}${id}`);
  }
}
