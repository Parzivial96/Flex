import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class DashboardRoute extends Route {
  @service userData;
  @service router;

  beforeModel() {
    if (this.userData.user.role === 'Consumer') {
      this.router.transitionTo('index');
    }
  }

  model() {
    return this.userData.user;
  }
}
