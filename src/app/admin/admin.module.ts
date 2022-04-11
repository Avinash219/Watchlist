import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { AdminRoutingModule } from './admin-routing.module';
import { RefDataComponent } from './ref-data/ref-data.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
@NgModule({
  declarations: [AdminLandingComponent, RefDataComponent],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    MatExpansionModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatListModule,
  ],
})
export class AdminModule {}
