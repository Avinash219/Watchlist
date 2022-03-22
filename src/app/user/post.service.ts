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
    console.log('Nody', body);
    const { limit, currentPage } = body;

    return this._http.post(
      `http://localhost:3000/api/post/getAllPost?limit=${limit}&currentPage=${currentPage}`,
      searchParam,
      {
        headers: headers,
      }
    );
  }

  createPost(body) {
    return this._http.post('http://localhost:3000/api/post/createPost', body);
  }

  likePost(body) {
    return this._http.put('http://localhost:3000/api/post/likes', body);
  }

  dislikePost(body) {
    return this._http.put('http://localhost:3000/api/post/dislikes', body);
  }

  setPostList(post) {
    console.log('Post Detail', post);
    this.postList$.next(post);
  }

  getPostList() {
    console.log('Inside');
    return this.postList$.asObservable();
  }
}
