import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [AdminLandingComponent],
  imports: [CommonModule, AdminRoutingModule],
})
export class AdminModule {}
