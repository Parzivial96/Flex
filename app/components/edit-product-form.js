import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditProductFormComponent extends Component {
  @tracked id = this.args.id;
  @tracked dp = this.args.dp;
  @tracked newDp = this.args.newDp;
  @tracked previewDp = this.args.previewDp;
  @tracked name = this.args.name;
  @tracked category = this.args.category;
  @tracked price = this.args.price;
  @tracked discount = this.args.discount;
  @tracked color = this.args.color;
  @tracked size = this.args.size;
  @tracked gender = this.args.gender;
  @tracked age = this.args.age;

  @service router;

  @action
  updateNewDp(event) {
    let file = event.target.files[0];
    if (file) {
      this.newDp = file;
      this.readImage(file);
    }
  }

  readImage(file) {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.previewDp = e.target.result;
    };
    reader.readAsDataURL(file);
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
    formData.append('id', this.id);
    if (this.newDp != null) {
      formData.append('dp', this.newDp);
    }
    formData.append('name', this.name);
    formData.append('category', this.category);
    formData.append('price', this.price);
    formData.append('discount', this.discount);
    formData.append('color', this.color);
    formData.append('size', this.size);
    formData.append('gender', this.gender);
    formData.append('age', this.age);

    let response = await fetch('http://localhost:8080/FlexAPI/updateProduct', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
      },
      body: formData,
    });

    if (response.ok) {
      location.reload();
    } else {
      this.router.transitionTo('/login');
    }
  }

  @action
  async handleDeleteProduct(event) {
    event.preventDefault();

    let response = await fetch('http://localhost:8080/FlexAPI/deleteProduct', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${this.id}`,
    });

    if (response.ok) {
      this.router.transitionTo('/manageProduct');
    } else {
      this.router.transitionTo('/login');
    }
  }
}
