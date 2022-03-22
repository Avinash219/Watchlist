import { catchError, concatMap } from 'rxjs/operators';
import { AuthenticateService } from './../../authenticate/authenticate.service';
import { PostService } from './../post.service';
import {
  ChangeDetectionStrategy,
  Component,
  NgZone,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostFormComponent implements OnInit {
  postForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _postService: PostService,
    private _auth: AuthenticateService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    console.log(this._auth.userInfo);
    this.initForm();
  }

  initForm() {
    this.postForm = this._fb.group({
      post: [''],
      author: [this._auth.userInfo['id']],
    });
  }

  submitPost() {
    // this.ngZone.runOutsideAngular(() => {
    this._postService
      .createPost(this.postForm.getRawValue())
      .pipe(
        catchError((e) => {
          console.log('Error');
          return EMPTY;
        }),
        concatMap((response) => {
          console.log('Resonse', response);
          return this._postService.getAllPost();
        })
      )
      .subscribe(
        (response) => {
          this._postService.setPostList(response);
          this.initForm();
          console.log('Response', response);
        },
        (error) => {
          console.log(error);
        }
      );
    //  });
  }
}
