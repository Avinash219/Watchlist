import { UserConfirmComponent } from './user-confirm/user-confirm.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserModule } from './user/user.module';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserLandingComponent } from './user/user-landing/user-landing.component';
import { LandingComponent } from './landing/landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuardService } from './user/auth-guard.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'confirm/:code', component: UserConfirmComponent },
  { path: 'reset-password/:token', component: ResetPasswordComponent },
  { path: 'landing', component: LandingComponent },
  {
    path: 'user',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      //preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
