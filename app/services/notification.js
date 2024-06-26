import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class NotificationService extends Service {
  @tracked isVisible = false;
  @tracked message = '';

  showMessage(msg) {
    this.message = msg;
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 5000);
  }
}
