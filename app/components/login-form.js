import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginFormComponent extends Component {
  @tracked email = '';
  @tracked password = '';
  @tracked errorMessage = '';
  @tracked showPassword = false;

  @service auth;
  @service router;

  @action
  updateEmail(event) {
    this.email = event.target.value;
  }

  @action
  updatePassword(event) {
    this.password = event.target.value;
  }

  @action
  updateShowPassword() {
    this.showPassword = !this.showPassword;
  }

  @action
  async handleLogin(event, router) {
    event.preventDefault();
    let response = await this.auth.login(this.email, this.password);
    if (response) this.router.transitionTo('/');
    else this.errorMessage = 'Invalid Username or Password.';
  }
}
