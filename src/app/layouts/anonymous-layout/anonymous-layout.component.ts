import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/helpers/models/user';
import { AuthenticationService } from 'src/app/helpers/services/authentication.service';

@Component({
  selector: 'app-anonymous-layout',
  templateUrl: './anonymous-layout.component.html',
  styleUrls: ['./anonymous-layout.component.css']
})
export class AnonymousLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    //this.router.navigate(['/admin']);
    // this.authenticationService.currentUser
    //   .subscribe(x => {
    //     console.log('x =' + x);
    //     this.currentUser = x;
        
    //   });
    
    //   if (this.currentUser) {
    //     console.log('currentUser =' + this.currentUser);
    //     this.router.navigate(['/admin']);
    //   } else {
    //     console.log('Here')
    //     this.router.navigate(['/anonymous']);
    //   }
  }

}
