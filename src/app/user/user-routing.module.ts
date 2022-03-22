import { ProfileDeactivateGuardGuard } from './profile-deactivate-guard.guard';
import { UserProfileResolverService } from './user-profile-resolver.service';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { PostFormComponent } from './post-form/post-form.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IdeaComponent } from './idea/idea.component';

const routes: Routes = [
  {
    path: ':username',
    component: UserDashboardComponent,
    children: [
      {
        path: 'landing',
        component: UserLandingComponent,
        children: [
          {
            path: 'all',
            component: PostFormComponent,
          },
          {
            path: '',
            redirectTo: 'all',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        resolve: { userDetail: UserProfileResolverService },
        canDeactivate: [ProfileDeactivateGuardGuard],
      },
      {
        path: 'idea',
        component: IdeaComponent,
      },
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
