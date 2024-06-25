import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service userData;
  @service productData;

  async beforeModel() {
    super.beforeModel(...arguments);
    await this.userData.fetchUserData();
    await this.productData.fetchProductData();
  }
}
