import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import the FormsModule

import { AuthGuard } from './auth.guard';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HomeComponent } from './Admin/home/home.component';
import { LoginComponent } from './Admin/login/login.component';
import { LoginUserComponent } from './User/login-user/login-user.component';
import { RegistrationUserComponent } from './User/registration-user/registration-user.component';

import { TableModule } from 'primeng/table';
import { ChartModule } from 'primeng/chart';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationService } from 'primeng/api';
import { ImageModule } from 'primeng/image';
import { CalendarModule } from 'primeng/calendar';

import { ViewAssignedProgramsComponent } from './User/view-assigned-programs/view-assigned-programs.component';
import { ExtensionPartnersComponent } from './Admin/extension-partners/extension-partners.component';
import { ManageExtensionComponent } from './Admin/manage-extension/manage-extension.component';
import { ProgramsComponent } from './Admin/programs/programs.component';
import { ManageAccountsComponent } from './Admin/manage-accounts/manage-accounts.component';
import { OngoingPartnersComponent } from './Admin/ongoing-partners/ongoing-partners.component';
import { ExpiredPartnersComponent } from './Admin/expired-partners/expired-partners.component';
import { TopNavComponent } from './User/top-nav/top-nav.component';
import { ShowListComponent } from './User/show-list/show-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PaginatorModule } from 'primeng/paginator';
import { ProgramDetailsComponent } from './User/program-details/program-details.component';
import { PendingAccountComponent } from './Admin/pending-account/pending-account.component';
import { UserGuard } from './user.guard';
import { EditProfileComponent } from './User/edit-profile/edit-profile.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { SideNavComponent } from './Admin/side-nav/side-nav.component';
import { AddProgramComponent } from './Admin/add-program/add-program.component';

const admins: Routes = [
  {
    path: 'admin',
    component: SideNavComponent,
    children: [
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'add_partner', component: ExtensionPartnersComponent },
      { path: 'pending', component: PendingAccountComponent },
      { path: 'manage_users', component: ManageAccountsComponent },
      { path: 'add_program', component: AddProgramComponent },
      { path: 'ongoing_partners', component: OngoingPartnersComponent },
    ],
  },
];

const admin: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'pending',
    component: PendingAccountComponent,
    canActivate: [AuthGuard],
  },
  // { path: 'dashboard', component: AdminDashboardComponent },
  { path: 'side', component: SideNavComponent },
  { path: 'extension-partners', component: ExtensionPartnersComponent },
  // { path: 'manage', component: ManageExtensionComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'manage-accounts', component: ManageAccountsComponent },
  { path: 'ongoing', component: OngoingPartnersComponent },
  { path: 'expired', component: ExpiredPartnersComponent },
];
const user: Routes = [
  { path: 'registration', component: RegistrationUserComponent },
  // { path: '', redirectTo: 'login_user', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login_user', component: LoginUserComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  // canActivate: [UserGuard]
  { path: 'list', component: ShowListComponent },
  {
    path: 'program-details/:id',
    component: ProgramDetailsComponent,
    canActivate: [UserGuard],
  },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoginUserComponent,
    RegistrationUserComponent,
    ExtensionPartnersComponent,
    ManageExtensionComponent,
    ProgramsComponent,
    ManageAccountsComponent,
    OngoingPartnersComponent,
    ExpiredPartnersComponent,
    TopNavComponent,
    ShowListComponent,
    LandingPageComponent,
    ProgramDetailsComponent,
    PendingAccountComponent,
    EditProfileComponent,
    AdminDashboardComponent,
    SideNavComponent,
    AddProgramComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(admin),
    RouterModule.forRoot(admins),
    RouterModule.forRoot(user),
    ButtonModule,
    BrowserAnimationsModule,
    PasswordModule,
    InputTextModule,
    MessagesModule,
    ToastModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    ChartModule,
    ConfirmDialogModule,
    DialogModule,
    ImageModule,
    CalendarModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
