import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './shared/auth.service';
import { LoggingService } from './shared/logging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ASSIGNMENTS APP';
  hide = true;
  logged = false;
  idUser!:string;
  passUser!:string;
  accounts = [
    {login: "Teacher_1", pass: "1234", role: "teacher"},
    {login: "Student_1", pass: "4567", role: "student"}
  ];

  constructor(private authService:AuthService, private router:Router) {}

  login() {
    let id = this.idUser;
    let ps = this.passUser;
    let role = "";
    let auth = false;
    this.accounts.forEach(function(value) {
      if(value.login==id && value.pass==ps) {
        console.log("Connecté");
        auth = true;
        role = value.role;
      } else {
        console.log("Accès refusé");
      }
    });
    if(auth) {
      if(!this.authService.loggedIn) {
        this.authService.logIn(role);
        this.logged = true;
      } else {
        this.authService.logOut();
        this.router.navigate(['/home']); 
      }
    }
  }

  logout() {
    this.router.navigate(['/home']);
    this.logged = false;
  }

  isTeacher():boolean {
    if(this.authService.role=="teacher") {
      return true;
    }
    return false;
  }

  /*onSubmitConx() {
    let id = this.idUser;
    let ps = this.passUser;
    let auth = false;
    this.accounts.forEach(function(value) {
      if(value.login==id && value.pass==ps) {
        console.log("Connecté");
        auth = true;
      } else {
        console.log("Accès refusé");
      }
    });
    if(auth) {
      this.logged = true;
    }
  }*/
}
