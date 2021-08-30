import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnonymousLayoutComponent } from './anonymous-layout.component';
import { RouterModule } from '@angular/router';
import { AnonymousLayoutRoutes } from './anonymous-layout.routing';
import { PartialsModule } from 'src/app/partials/partials.module';


@NgModule({
  declarations: [AnonymousLayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(AnonymousLayoutRoutes),
    PartialsModule
  ],
  exports: [
    AnonymousLayoutComponent
  ]
})
export class AnonymousLayoutModule { }
