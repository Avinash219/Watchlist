import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading$ = new BehaviorSubject(false);
  constructor() {}

  setIsLoading(value: boolean) {
    this.isLoading$.next(value);
  }

  getIsLoading() {
    return this.isLoading$.asObservable();
  }
}
