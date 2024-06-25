import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProfileRoute extends Route {
  @service userData;

  model() {
    return this.userData.user;
  }
}
