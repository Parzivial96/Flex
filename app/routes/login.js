import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class LoginRoute extends Route {
  @service router;

  beforeModel() {
    if (sessionStorage.getItem('access') != null) {
      this.router.transitionTo('index');
    }
  }
}
