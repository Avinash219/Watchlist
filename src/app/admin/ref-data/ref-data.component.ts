import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-ref-data',
  templateUrl: './ref-data.component.html',
  styleUrls: ['./ref-data.component.scss'],
})
export class RefDataComponent implements OnInit {
  refDataPanel: boolean = false;
  refDataValuePanel: boolean = false;
  refData: string = null;
  refDataValueMapper: any = {};
  selectedRefData: string = null;
  newRefDataValue: string = null;

  constructor(private _admin: AdminService) {}

  ngOnInit(): void {
    this._admin.getAllRefData().subscribe((response) => {
      response['data'].map((data) => {
        this.refDataValueMapper[data['refDataType']] = data['refDataValue'];
      });
    });
    console.log(this.refDataValueMapper);
  }

  addRefData() {
    this._admin
      .addRefData({ refDataType: this.refData })
      .subscribe((response) => {
        console.log(response);
      });
  }

  addRefDataValue() {
    this._admin
      .addRefDataValue(this.selectedRefData, {
        refDataValue: this.newRefDataValue,
      })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
