import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileRoute extends Route {
  @service userData;
  @service router;

  async beforeModel() {
    super.beforeModel(...arguments);
    if (sessionStorage.getItem('access') != null) {
      await this.userData.fetchUserData();
    } else {
      this.router.transitionTo('login');
    }
  }

  model() {
    return this.userData.user;
  }
}
