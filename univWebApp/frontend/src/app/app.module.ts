import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule }  from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';



import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { AccountComponent } from './account/account.component';
import { ItemComponent } from './item/item.component';
import { AdminComponent } from './admin/admin.component';
import { AdminGetAllUsersComponent } from './admin-get-all-users/admin-get-all-users.component';
import { AdminAddUserComponent } from './admin-add-user/admin-add-user.component';
import { AdminAddItemComponent } from './admin-add-item/admin-add-item.component';
import { AdminApproveComponent } from './admin-approve/admin-approve.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

const routes: Routes = [
  {path: 'api/home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'api/admin/dashboard', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'api/admin/getOneUser', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'api/admin/deleteOneUser', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'api/admin/updateOneUser', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'api/admin/createOneUser', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'api/account', component: AccountComponent, canActivate: [AuthGuard]},
  {path: 'api/login', component: LoginComponent},
  {path: 'api/signup', component: SignupComponent},
  { path: '**', redirectTo: '/api/signup', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AccountComponent,
    ItemComponent,
    AdminComponent,
    AdminGetAllUsersComponent,
    AdminAddUserComponent,
    AdminAddItemComponent,
    AdminApproveComponent,
    ThemeToggleComponent,
  ],
  imports: [
	  BrowserModule,
	  HttpClientModule,
	  NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatTabsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
