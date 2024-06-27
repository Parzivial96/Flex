import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class NavbarComponent extends Component {
  @service userData;
  @service router;
  @tracked searchQuery = '';
  @service productData;
  @tracked searchProducts;
  @tracked isSearchFocused = false;

  @action
  updateSearchQuery(event) {
    this.searchQuery = event.target.value;

    if (this.searchQuery.trim() === '') {
      this.searchProducts = null;
    } else {
      let products = this.productData.products;
      let filteredProducts = [];
      products.forEach((product) => {
        let productString = JSON.stringify(product).toLowerCase();
        if (productString.includes(this.searchQuery.toLowerCase())) {
          filteredProducts.push(product);
        }
      });
      this.searchProducts = filteredProducts;
    }
  }

  @action
  handleFocus() {
    this.isSearchFocused = true;
  }

  @action
  handleBlur() {
    setTimeout(() => {
      this.isSearchFocused = false;
    }, 200);
  }

  @computed('router.{currentRoute,currentRouteName}') get shouldHideDiv() {
    const currentRoute = this.router.currentRouteName;
    return (
      currentRoute === 'login' ||
      currentRoute === 'signup' ||
      currentRoute === 'forgotpassword'
    );
  }
}
