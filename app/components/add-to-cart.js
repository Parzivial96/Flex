import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddToCartComponent extends Component {
  @tracked productId = '';
  @tracked price = '';
  @tracked discount = '';
  @tracked color = '';
  @tracked size = '';

  @service router;

  @action
  updateProductId(event) {
    this.productId = event.target.value;
  }

  @action
  updatePrice(event) {
    this.price = event.target.value;
  }

  @action
  updateDiscount(event) {
    this.discount = event.target.value;
  }

  @action
  updateColor(event) {
    this.color = event.target.value;
  }

  @action
  updateSize(event) {
    this.size = event.target.value;
  }

  @action
  async handleAddToCart(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append('productId', this.productId);
    formData.append('price', this.price);
    formData.append('discount', this.discount);
    formData.append('color', this.color);
    formData.append('size', this.size);

    let response = await fetch('http://localhost:8080/FlexAPI/addOrder', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
      },
      body: formData,
    });

    if (response.ok) {
      alert('Product Added To Cart');
    } else {
      this.router.transitionTo('/login');
    }
  }
}
