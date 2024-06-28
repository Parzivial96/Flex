import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service userData;
  @service productData;
  @service router;

  async beforeModel() {
    super.beforeModel(...arguments);
    if (sessionStorage.getItem('access') != null) {
      await this.userData.fetchUserData();
      await this.productData.fetchProductData();
    } else {
      this.router.transitionTo('login');
    }
  }

  model() {
    return this.userData.user;
  }
}
