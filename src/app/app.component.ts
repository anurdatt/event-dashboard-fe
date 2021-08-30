import { AfterContentInit, AfterViewInit, Component, ContentChild, Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from './helpers/models/user';
import { AuthenticationService } from './helpers/services/authentication.service';
//import { ExampleDirective } from './example.directive';

   /* global bootstrap: false */
 /*   (function () {
    'use strict'
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl)
    })
  })() */
  


@Directive({selector: 'app-example-code'})
export class ExampleCodeDirective {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit{
  title = 'events-dashboard';
  user: User;
  userSubscription: Subscription;

  @Input() message: string;

  msgFromParent: string;
  // @ContentChild(ExampleCodeDirective) 
  // content: ElementRef;
  
  // bodyFromParent: string;

  constructor(private elemetRef: ElementRef, 
    private authenticationService: AuthenticationService,
    private router:Router) {
  }
  
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.authenticationService.currentUser.subscribe(x => this.user = x);
    // if (this.user) {
    //   this.router.navigate(['/admin']);
    // } else {
    //   this.router.navigate(['/anonymous'])
    // }
  }

  ngAfterContentInit(): void {
    console.log('aa ' + this.message);
    // if (this.content) {
    //   this.bodyFromParent = this.content.nativeElement.innerText;
    //   console.log("bodyFromParent = " + this.bodyFromParent);
    // }

    this.msgFromParent = this.elemetRef.nativeElement.getAttribute("message");
  }
  
  ngAfterViewInit(): void {
    console.log('bb ' + this.msgFromParent);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
}
}
