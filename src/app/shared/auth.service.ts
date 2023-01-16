import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn=false;
  role!: string;

  constructor() { }

  logIn(role: string) {
    this.loggedIn = true;
    this.role = role;
  }

  logOut() {
    this.loggedIn = false;
  }

  // renvoie une promesse qui est résolue si l'utilisateur est loggué
  isAdmin() {
    const isUserAdmin = new Promise((resolve, reject) => {
      resolve(this.loggedIn);
    });
    return isUserAdmin;
  }
}
