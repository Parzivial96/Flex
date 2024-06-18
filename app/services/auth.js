import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class AuthService extends Service {
  //@tracked isAuthenticated = false;

  @tracked access = sessionStorage.getItem('access');

  //@tracked id = sessionStorage.getItem('id');

  @service router;

  constructor() {
    super(...arguments);
    /*this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (!this.isAuthenticated) {
      this.validate();
    }*/
  }

  /*async validate() {
    try {
      let response = await fetch('http://localhost:8080/FlexAPI/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'access': sessionStorage.getItem('access'),
        },
      });

      if (!response.ok) {
        sessionStorage.clear();
        this.access = null;
        this.id = null;
        this.router.transitionTo('login');
      }
    } catch (error) {
      console.log('Error checking session:', error);
      //this.isAuthenticated = false;
      //localStorage.removeItem('isAuthenticated');
    }
  }*/

  async login(email, password) {
    try {
      let response = await fetch('http://localhost:8080/FlexAPI/validateUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}&password=${password}`,
      });

      if (response.ok) {
        let data = await response.json();
        //this.setAuthenticated(true);
        sessionStorage.setItem('access', data.jwt);
        //sessionStorage.setItem('id', data.id);
        this.access = data.jwt;
        //this.id = data.id;
        //this.setCookie('access', data.jwt, 1);
        this.router.transitionTo('/');
      } else {
        // Handle login failure
        alert('Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  async logout() {
    try {
      //this.deleteCookie('access');
      //this.setAuthenticated(false);
      sessionStorage.clear();
      this.access = null;
      //this.id = null;
      this.router.transitionTo('login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }

  /*setAuthenticated(value) {
    this.isAuthenticated = value;
    if (value) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }*/

  /*setCookie(name, value, days) {
    let expires = '';
    if (days) {
      let date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/; SameSite=None; Secure';
  }

  deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }*/
}
