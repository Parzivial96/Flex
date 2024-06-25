import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class SignupFormComponent extends Component {
  @tracked name = '';
  @tracked email = '';
  @tracked password = '';
  @tracked confirmPassword = '';
  @tracked errorMessage = '';
  @tracked showPassword = false;

  @service auth;

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
  updateConfirmPassword(event) {
    this.confirmPassword = event.target.value;
  }

  @action
  updateShowPassword() {
    this.showPassword = !this.showPassword;
  }

  @action
  async handleSignup(event) {
    event.preventDefault();
    if (this.confirmPassword != this.password)
      this.errorMessage = "Password dosen't match!";
    else
      await this.auth.signup(this.name, this.email, this.password, 'Consumer');
  }
}
