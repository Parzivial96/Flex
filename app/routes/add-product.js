import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AddProductRoute extends Route {
  @service router;
  @service userData;

  async beforeModel() {
    if (sessionStorage.getItem('access') != null) {
      await this.userData.fetchUserData();
      if (this.userData.user.role == 'Consumer') {
        this.router.transitionTo('login');
      }
    } else {
      this.router.transitionTo('login');
    }
  }
}
