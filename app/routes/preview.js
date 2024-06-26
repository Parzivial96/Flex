import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class PreviewRoute extends Route {
  @service productData;
  @service router;

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

    filteredProduct.forEach((product) => {
      product.color = product.color.split(',');
      product.size = product.size.split(',');
      if (product.discount != 0) {
        product.discountedPrice =
          product.price - product.price * (product.discount / 100);
      }
    });

    console.log(filteredProduct);

    return filteredProduct[0];
  }
}
