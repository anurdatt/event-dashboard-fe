import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../helpers/models/user';
import { UserService } from '../helpers/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loading = false;
  users: User[];
  routeData;

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(x => this.routeData = x)
    console.log('activatedRoute.data = '+ JSON.stringify(this.routeData));
    if (this.routeData['role'] == 'ADMIN') {
      this.loading = true;
          this.userService.getAll().pipe().subscribe(users => {
            this.loading = false;
            this.users = users;
          });
    }
    
  }

}
