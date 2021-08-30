import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/home/home.component";

export const AdminLayoutRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: {role: 'ADMIN'} }

]