import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ManageProductRoute extends Route {
  @service router;
  @service userData;
  @service productData;

  async model() {
    let products = this.productData.products;

    if (this.userData.user.role != 'Admin') {
      let filteredProducts = products.filter(
        (product) => product.sellerId === this.userData.user.id,
      );
      return filteredProducts;
    }

    return products;
  }
}
