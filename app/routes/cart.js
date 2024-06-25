import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class CartRoute extends Route {
  @service auth;
  @service router;

  async model() {
    let response = await fetch('http://localhost:8080/FlexAPI/getOrder', {
      method: 'GET',
      headers: {
        access: sessionStorage.getItem('access'),
      },
    });

    if (response.ok) {
      let orders = await response.json();
      return orders;
    }
    this.router.transitionTo('/login');
  }
}
