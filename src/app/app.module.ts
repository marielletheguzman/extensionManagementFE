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
import { ColorPickerModule } from 'primeng/colorpicker';
import { CarouselModule } from 'primeng/carousel';

import { ViewAssignedProgramsComponent } from './User/view-assigned-programs/view-assigned-programs.component';
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
import { ViewSpecificPartnerComponent } from './Admin/view-specific-partner/view-specific-partner.component';
import { AddPartnerComponent } from './Admin/add-partner/add-partner.component';
import { ViewSpecificPartnerPipe } from './Admin/view-specific-partner/view-specific-partner.pipe';
import { RenewPartnerComponent } from './Admin/renew-partner/renew-partner.component';
import { RenewComponent } from './Admin/renew/renew.component';
import { EditSystemComponent } from './Admin/edit-system/edit-system.component';
import { EditSystemLogoComponent } from './Admin/edit-system-logo/edit-system-logo.component';
import { EditSystemImgComponent } from './Admin/edit-system-img/edit-system-img.component';
import { EditUserImgComponent } from './User/edit-user-img/edit-user-img.component';
import { EditUserPasswordComponent } from './User/edit-user-password/edit-user-password.component';
import { AdminEditProfileComponent } from './Admin/admin-edit-profile/admin-edit-profile.component';
import { ListProgramMembersComponent } from './Admin/list-program-members/list-program-members.component';
import { AddProgramMemberComponent } from './Admin/add-program-member/add-program-member.component';
import { AddParticipantComponent } from './Admin/add-participant/add-participant.component';
import { AddFlowComponent } from './Admin/add-flow/add-flow.component';
import { ListOfProgramsComponent } from './Admin/list-of-programs/list-of-programs.component';
import { FinishedListOfProgramsComponent } from './Admin/finished-list-of-programs/finished-list-of-programs.component';
import { ViewAdminSpecificProgramComponent } from './Admin/view-admin-specific-program/view-admin-specific-program.component';
import { ListProgramsUploadComponent } from './Admin/list-programs-upload/list-programs-upload.component';
import { TerminalReportComponent } from './Admin/terminal-report/terminal-report.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
// import { EditWebsiteComponent } from './Admin/edit-website/edit-website.component';

const admins: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: SideNavComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'pending',
        component: PendingAccountComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manage_users',
        component: ManageAccountsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit_user/:id',
        component: AdminEditProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'list-programs',
        component: ListOfProgramsComponent,
        canActivate: [AuthGuard],
      }, //added
      {
        path: 'upload-file/:id',
        component: ListProgramsUploadComponent,
        canActivate: [AuthGuard],
      }, //added
      {
        path: 'view-programs/:id', // to do
        component: ViewAdminSpecificProgramComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'finished-programs',
        component: FinishedListOfProgramsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add_program',
        component: AddProgramComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'list-member',
        component: ListProgramMembersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-member',
        component: AddProgramMemberComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-participant',
        component: AddParticipantComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-flow',
        component: AddFlowComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ongoing_partners',
        component: OngoingPartnersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'expired_partners',
        component: ExpiredPartnersComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'view_partner/:id',
        component: ViewSpecificPartnerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add_partner',
        component: AddPartnerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'renew_partner/:id',
        component: RenewPartnerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit',
        component: EditSystemComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-logo',
        component: EditSystemLogoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-img',
        component: EditSystemImgComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'edit-img',
        component: EditSystemImgComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'terminal-report',
        component: TerminalReportComponent,
        canActivate: [AuthGuard],
      },
      // { path: 'edit_website', component: EditWebsiteComponent },
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
  { path: 'manage', component: ManageExtensionComponent },
  { path: 'programs', component: ProgramsComponent },
  { path: 'manage-accounts', component: ManageAccountsComponent },
  { path: 'ongoing', component: OngoingPartnersComponent },
  { path: 'expired', component: ExpiredPartnersComponent },
];
const user: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'registration', component: RegistrationUserComponent }, //@mich button
  // { path: '', redirectTo: 'login_user', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login_user', component: LoginUserComponent }, // remove gray bg
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [UserGuard],
  },
  // canActivate: [UserGuard]
  { path: 'list', component: ShowListComponent, canActivate: [UserGuard] }, //fix bg
  {
    path: 'edit-img',
    component: EditUserImgComponent,
    canActivate: [UserGuard],
  },
  {
    path: 'edit-password',
    component: EditUserPasswordComponent,
    canActivate: [UserGuard],
  },
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
    ViewSpecificPartnerComponent,
    AddPartnerComponent,
    ViewSpecificPartnerPipe,
    RenewPartnerComponent,
    RenewComponent,
    EditSystemComponent,
    EditSystemLogoComponent,
    EditSystemImgComponent,
    EditUserImgComponent,
    EditUserPasswordComponent,
    AdminEditProfileComponent,
    ListProgramMembersComponent,
    AddProgramMemberComponent,
    AddParticipantComponent,
    AddFlowComponent,
    ListOfProgramsComponent,
    FinishedListOfProgramsComponent,
    ViewAdminSpecificProgramComponent,
    ListProgramsUploadComponent,
    // EditWebsiteComponent,
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
    CarouselModule,
    ColorPickerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token');
        },
      },
    }),
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
