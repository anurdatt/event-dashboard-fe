import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../helpers/models/user';
import { AuthenticationService } from '../helpers/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = ''; 

  constructor(
    private formBuilder:FormBuilder, 
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {

  }

  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    console.log('returnUrl = ' + this.returnUrl); 
    this.submitted = true
    if (this.loginForm.invalid) {
      return;
    } 

    this.loading = true;
    // setTimeout(() => {
    //   this.loading = false;
    //   //this.error="Connection timed out!";
    //   this.authenticationService.currentUserSubject.next(Object.assign(new User(), {
    //     id: 1,
    //     username: 'test',
    //     password: 'test',
    //     firstName: 'Test',
    //     lastName: 'User',
    //     token: 'fake-jwt-token'
    //   }));
    //   this.router.navigate([this.returnUrl]);
    // }, 2000);
    // return;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          this.error = ((typeof error) === 'object') ? JSON.stringify(error.message) : error;
          this.loading = false;
        }
      );

  }
}
