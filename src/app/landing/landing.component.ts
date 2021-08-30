import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../helpers/models/user';
import { AuthenticationService } from '../helpers/services/authentication.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit, OnDestroy 
{

  currentUser: User;
  currentUserSubscription: Subscription

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activateRoute: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.currentUserSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.currentUserSubscription = 
    this.authenticationService.currentUser
      .subscribe(x => {
        console.log('x =' + x);
        this.currentUser = x;
        
      });
    
      if (this.currentUser) {
        this.router.navigate(['/admin']);
      } else {
        console.log('Here')
        this.router.navigate(['/anonymous']);
      }
  }

}
