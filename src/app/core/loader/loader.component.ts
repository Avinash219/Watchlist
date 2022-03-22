import { LoaderService } from './../service/loader.service';
import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'determinate';
  value = 50;
  isLoading: boolean = false;

  constructor(private _loaderService: LoaderService) {}

  ngOnInit(): void {
    this._loaderService.getIsLoading().subscribe((response) => {
      this.isLoading = response;
    });
  }
}
