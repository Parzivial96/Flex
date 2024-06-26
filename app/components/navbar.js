import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class NavbarComponent extends Component {
  @service userData;
  @service router;

  @computed('router.{currentRoute,currentRouteName}') get shouldHideDiv() {
    const currentRoute = this.router.currentRouteName;
    return currentRoute === 'login' || currentRoute === 'signup';
  }
}
