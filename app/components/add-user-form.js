import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class AddUserFormComponent extends Component {
  @tracked dp = null;
  @tracked name = '';
  @tracked email = '';
  @tracked password = '';
  @tracked role = 'Consumer';

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
  async handleAddUser(event) {
    event.preventDefault();

    let formData = new FormData();
    formData.append('dp', this.dp);
    formData.append('name', this.name);
    formData.append('email', this.email);
    formData.append('password', this.password);
    formData.append('role', this.role);

    let response = await fetch('http://localhost:8080/FlexAPI/addUser', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
      },
      body: formData,
    });

    if (response.ok) {
      this.notification.showMessage('User Added 👍');
      setTimeout(function () {
        location.reload();
      }, 5000);
    } else {
      this.router.transitionTo('login');
    }
  }
}
