import { UserApi } from './../_viewModels/userApi';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../_model';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserApi>;
    public currentUser: Observable<UserApi>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserApi>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserApi {
        return this.currentUserSubject.value;
    }

    login(usuario: string, senha: string) {
        return this.http.post<any>(`${environment.apiUrl}auth/login`, { usuario, senha })
            .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    register(username: string, password: string, first_name: string, last_name: string, email:string) {
      return this.http.post<any>(`${environment.apiUrl}auth/register`, { username, password, first_name, last_name, email })
          .pipe(map(ret => {
              return ret;
          }));
  }
    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
