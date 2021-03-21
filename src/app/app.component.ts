import { PERMISSIONS } from './_enums/permissions.enum';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_model';
import { AuthenticationService } from './_services';
import { UserApi } from './_viewModels/userApi';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: UserApi;
  permissions: PERMISSIONS;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }
  ngOnInit() {
    this.permissions =  this.currentUser.user.permissao;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}
