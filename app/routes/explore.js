import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ExploreRoute extends Route {
  @service productData;

  async model(params) {
    let products = this.productData.products;

    let filteredProducts = products.filter(
      (product) => product.category === params.category,
    );

    filteredProducts.forEach((filteredProduct) => {
      filteredProduct.discountedPrice =
        filteredProduct.price -
        filteredProduct.price * (filteredProduct.discount / 100);
    });

    return filteredProducts;
  }
}
