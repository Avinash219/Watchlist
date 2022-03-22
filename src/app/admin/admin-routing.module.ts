import { NgModule } from '@angular/core';
import { AdminLandingComponent } from './admin-landing/admin-landing.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: '', component: AdminLandingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
