import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ExploreRoute extends Route {
  @service productData;
  @service favoriteData;
  @service router;

  async beforeModel() {
    super.beforeModel(...arguments);
    if (sessionStorage.getItem('access') != null) {
        await this.productData.fetchProductData();
        await this.favoriteData.fetchFavoriteData();
    } else {
      this.router.transitionTo('login');
    }
  }

  async model(params) {
    let products = this.productData.products;
    let favorites = this.favoriteData.favorites;

    let filteredProducts = products.filter(
      (product) => product.category === params.category,
    );


    filteredProducts.forEach((filteredProduct) => {
      filteredProduct.discountedPrice =
        filteredProduct.price -
        filteredProduct.price * (filteredProduct.discount / 100);

      filteredProduct.isFavorite = favorites.some(
        (favorite) => favorite.productId == filteredProduct.id,
      );
    });

    return filteredProducts;
  }
}
