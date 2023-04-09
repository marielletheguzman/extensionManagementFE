import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

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
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { RegistrationUserComponent } from './User/registration-user/registration-user.component';

const admin: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
];
const user: Routes = [
  { path: 'registration_user', component: RegistrationUserComponent },
  // { path: '', redirectTo: 'login_user', pathMatch: 'full' },
  // { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  // { path: 'login_user', component: LoginUserComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    LoginUserComponent,
    DashboardComponent,
    RegistrationUserComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(admin),
    // RouterModule.forRoot(user),
    ButtonModule,
    BrowserAnimationsModule,
    PasswordModule,
    InputTextModule,
    MessagesModule,
    ToastModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
  exports: [RouterModule],
})
export class AppModule {}
