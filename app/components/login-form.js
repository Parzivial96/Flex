import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LoginFormComponent extends Component {
  @tracked email = '';
  @tracked password = '';

  @service auth;

  @action
  updateEmail(event) {
    this.email = event.target.value;
  }

  @action
  updatePassword(event) {
    this.password = event.target.value;
  }

  @action
  async handleLogin(event) {
    event.preventDefault();
    await this.auth.login(this.email, this.password);
  }
}
