import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ManageUserRoute extends Route {
  @service router;

  async model() {
    let response = await fetch('http://localhost:8080/FlexAPI/getAllUser', {
      method: 'GET',
      headers: {
        access: sessionStorage.getItem('access'),
      },
    });
    if (response.ok) {
      let users = await response.json();
      return users;
    } else {
      sessionStorage.clear();
      this.router.transitionTo('login');
    }
  }
}
