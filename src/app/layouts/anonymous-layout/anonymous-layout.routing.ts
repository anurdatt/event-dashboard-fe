import { Routes } from "@angular/router";
import { HomeComponent } from "src/app/home/home.component";

export const AnonymousLayoutRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent }

]