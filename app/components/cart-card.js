import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CartCardComponent extends Component {
  @service notification;
  @service router;

  @action
  async addToOrder(event) {
    event.preventDefault();
    let response = await fetch('http://localhost:8080/FlexAPI/updateOrder', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${this.args.orderDetails.id}&productId=${this.args.orderDetails.productId}&price=${this.args.orderDetails.productPrice}&discount=${this.args.orderDetails.productDiscount}&status=${1}`,
    });

    if (response.ok) {
      this.notification.showMessage('Order Placed 🛒');
      setTimeout(function () {
        location.reload();
      }, 5000);
    } else {
      this.router.transitionTo('login');
    }
  }

  @action
  async removeFromCart(event) {
    event.preventDefault();
    let response = await fetch('http://localhost:8080/FlexAPI/deleteOrder', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${this.args.orderDetails.id}`,
    });

    if (response.ok) {
      this.notification.showMessage('Item Removed From 🛒');
      setTimeout(function () {
        location.reload();
      }, 5000);
    } else {
      this.router.transitionTo('login');
    }
  }
}
