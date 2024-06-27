import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EditProductRoute extends Route {
  @service router;
  @service productData;

  async beforeModel() {
    super.beforeModel(...arguments);
    if (sessionStorage.getItem('access') != null) {
      await this.productData.fetchProductData();
    } else {
      this.router.transitionTo('login');
    }
  }

  async model(params) {
    let products = this.productData.products;

    let filteredProduct = products.filter((product) => product.id == params.id);

    return filteredProduct[0];
  }
}
