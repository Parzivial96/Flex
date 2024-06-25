import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ProductDataService extends Service {
  @service router;
  @tracked products = null;

  async fetchProductData() {
    let response = await fetch('http://localhost:8080/FlexAPI/getProduct', {
      method: 'GET',
      headers: {
        access: sessionStorage.getItem('access'),
      },
    });

    if (response.ok) {
      let products = await response.json();
      this.products = products;
    } else {
      sessionStorage.clear();
      this.router.transitionTo('login');
    }

  }

  clearProductData() {
    this.product = null;
  }
}
