import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class OrderService extends Service {
  @tracked orders = null;

  async addOrder(productId, color, size) {
    let response = await fetch('http://localhost:8080/FlexAPI/addOrder', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `productId=${productId}&color=${color}&size=${size}`,
    });

    if (response.ok) {
      return true;
    } else {
      return false;
    }
  }

  async getOrder() {
    let response = await fetch('http://localhost:8080/FlexAPI/getOrder', {
      method: 'GET',
      headers: {
        access: sessionStorage.getItem('access'),
      },
    });

    if (response.ok) {
      let jsonResponse = await response.json();
      this.orders = jsonResponse;
    } else {
      this.router.transitionTo('login');
    }
  }
}
