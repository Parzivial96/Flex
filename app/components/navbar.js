import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class LogoutButtonComponent extends Component {
  @service router;
}
