import { Author } from './Author';

export interface Post {
  author: Author;

  test: string;
}

export interface PostList {
  postList: Array<Post>;
}
