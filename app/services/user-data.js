import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class UserDataService extends Service {
  @service router;
  @tracked user = null;

  async fetchUserData() {
    let response = await fetch('http://localhost:8080/FlexAPI/getUser', {
      method: 'GET',
      headers: {
        access: sessionStorage.getItem('access'),
      },
    });
    if (response.ok) {
      let jsonResponse = await response.json();
      this.user = jsonResponse[0];
    } else {
      sessionStorage.clear();
      this.router.transitionTo('login');
    }
  }

  clearUserData() {
    this.user = null;
  }
}
