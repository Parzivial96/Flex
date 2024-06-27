import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditUserFormComponent extends Component {
  @tracked id = this.args.id;
  @tracked dp = this.args.dp;
  @tracked newDp = this.args.newDp;
  @tracked previewDp = this.args.previewDp;
  @tracked name = this.args.name;
  @tracked email = this.args.email;
  @tracked password = this.args.password;
  @tracked role = this.args.role;

  @service router;
  @service notification;

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
  updateEmail(event) {
    this.email = event.target.value;
  }

  @action
  updatePassword(event) {
    this.password = event.target.value;
  }

  @action
  updateRole(event) {
    this.role = event.target.value;
  }

  @action
  async handleUpdateUser(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append('id', this.id);
    if (this.newDp != null) {
      formData.append('dp', this.newDp);
    }
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('role', this.role);

    let response = await fetch('http://localhost:8080/FlexAPI/updateUser', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
      },
      body: formData,
    });

    if (response.ok) {
      this.notification.showMessage('User Updated 👍');
      setTimeout(function () {
        location.reload();
      }, 5000);
    } else {
      this.router.transitionTo('login');
    }
  }

  @action
  async handleDeleteUser(event) {
    event.preventDefault();

    let response = await fetch('http://localhost:8080/FlexAPI/deleteUser', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `id=${this.id}`,
    });

    if (response.ok) {
      this.notification.showMessage('User Deleted ❌');
      this.router.transitionTo('manageUser');
    } else {
      this.router.transitionTo('login');
    }
  }
}
