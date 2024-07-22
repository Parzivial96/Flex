import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import fetch from 'fetch';

export default class AuthService extends Service {
  @tracked access = sessionStorage.getItem('access');
  @service userData;
  @service router;
  @service notification;

  constructor() {
    super(...arguments);
  }

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
        sessionStorage.setItem('access', data.jwt);
        this.access = data.jwt;
        await this.userData.fetchUserData();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  }

  async signup(name, email, password, role) {
    try {
      let response = await fetch('http://localhost:8080/FlexAPI/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `email=${email}&password=${password}&name=${name}&role=${role}`,
      });

      if (response.ok) {
        this.router.transitionTo('login');
        this.notification.showMessage("Login to start shopping.");
      } else {
        this.notification.showMessage("Please Try Again.");
      }
    } catch (error) {
      console.error('Error during signup: ', error);
    }
  }

  async logout() {
    try {
      sessionStorage.clear();
      this.access = null;
      this.userData.clearUserData();
      this.router.transitionTo('login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
