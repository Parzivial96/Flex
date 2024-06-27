import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddProductFormComponent extends Component {
  @tracked dp = null;
  @tracked name = '';
  @tracked category = 'T-Shirt';
  @tracked price = '';
  @tracked discount = '';
  @tracked color = '';
  @tracked size = '';
  @tracked gender = 'Male';
  @tracked age = 'Kids';

  @service router;
  @service notification;

  @action
  updateDp(event) {
    this.dp = event.target.files[0];
  }

  @action
  updateName(event) {
    this.name = event.target.value;
  }

  @action
  updateCategory(event) {
    this.category = event.target.value;
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
  updateGender(event) {
    this.gender = event.target.value;
  }

  @action
  updateAge(event) {
    this.age = event.target.value;
  }

  @action
  async handleAddProduct(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append('dp', this.dp);
    formData.append('name', this.name);
    formData.append('category', this.category);
    formData.append('price', this.price);
    formData.append('discount', this.discount);
    formData.append('color', this.color);
    formData.append('size', this.size);
    formData.append('gender', this.gender);
    formData.append('age', this.age);

    let response = await fetch('http://localhost:8080/FlexAPI/addProduct', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
      },
      body: formData,
    });

    if (response.ok) {
      this.notification.showMessage('Product Added 👍');
      setTimeout(function () {
        location.reload();
      }, 5000);
    } else {
      this.router.transitionTo('login');
    }
  }
}
