import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class PreviewController extends Controller {
  @tracked selectedColor = null;
  @tracked selectedSize = null;
  @service notification;
  @service order;

  @action
  selectColor(event) {
    this.selectedColor = event.target.value;
  }

  @action
  selectSize(event) {
    this.selectedSize = event.target.value;
  }

  @action
  addToCart() {
    if (this.selectedColor && this.selectedSize) {
      const product = this.model;
      if (
        this.order.addOrder(product.id, this.selectedColor, this.selectedSize)
      ) {
        this.notification.showMessage('Item added to cart 👍');
      } else {
        this.notification.showMessage('Some problem adding item to cart 😬');
      }
    } else {
      this.notification.showMessage('Please select a color and size.');
    }
  }
}
