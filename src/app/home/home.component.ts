import { Component, OnInit } from '@angular/core';
import { PERMISSIONS } from '../_enums/permissions.enum';
import { AuthenticationService } from '../_services';
import { UserApi } from '../_viewModels/userApi';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: UserApi;
  permissions: PERMISSIONS;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

  ngOnInit(){
    this.permissions =  this.currentUser.user.permissao;
  }

}
