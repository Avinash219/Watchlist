import { UserRoutingModule } from './user-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserLandingComponent } from './user-landing/user-landing.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostFormComponent } from './post-form/post-form.component';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { IdeaComponent } from './idea/idea.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { DateTransformPipe } from './date-transform.pipe';
import { TipsComponent } from './tips/tips.component';
import { QnaComponent } from './qna/qna.component';
import { ReplySectionComponent } from './reply-section/reply-section.component';
import { ReplyFormComponent } from './reply-form/reply-form.component';
import { ReplyListComponent } from './reply-list/reply-list.component';

@NgModule({
  declarations: [
    UserProfileComponent,
    UserLandingComponent,
    PostFormComponent,
    UserMenuComponent,
    IdeaComponent,
    UserDashboardComponent,
    DateTransformPipe,
    TipsComponent,
    QnaComponent,
    ReplySectionComponent,
    ReplyFormComponent,
    ReplyListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatListModule,
    UserRoutingModule,
    MatPaginatorModule,
  ],
})
export class UserModule {}
