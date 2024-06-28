import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CartRoute extends Route {
  @service order;
  @service router;

  async beforeModel() {
    if (sessionStorage.getItem('access') != null) {
      await this.order.getOrder();
    } else {
      this.router.transitionTo('login');
    }
  }

  async model() {
    let orders = this.order.orders;
    let filteredOrders = orders.filter((order) => order.status == 0);
    filteredOrders.forEach((filteredOrder) => {
      filteredOrder.discountedPrice =
        filteredOrder.productPrice -
        filteredOrder.productPrice * (filteredOrder.productDiscount / 100);
    });

    return filteredOrders;
  }
}
