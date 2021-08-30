import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './helpers/auth.guard';
import { LandingComponent } from './landing/landing.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AnonymousLayoutComponent } from './layouts/anonymous-layout/anonymous-layout.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '', 
    component: LandingComponent, pathMatch: 'full',
    //loadChildren: './landing/landing.module#LandingModule',
    //redirectTo: 'anonymous', pathMatch: 'full',
    //redirectTo: 'admin', pathMatch: 'full'
  },
  {
    path: 'admin', 
    component: AdminLayoutComponent,
    loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule', 
    canActivate: [AuthGuard]
  },
  {
    path: 'anonymous',
    component: AnonymousLayoutComponent,
    loadChildren: './layouts/anonymous-layout/anonymous-layout.module#AnonymousLayoutModule'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    //path: '**', redirectTo: 'admin'
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
