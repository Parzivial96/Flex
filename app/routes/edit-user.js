import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class EditUserRoute extends Route {
  @service router;

  async model(params) {
    let response = await fetch(
      'http://localhost:8080/FlexAPI/getUser?id=' + params.id,
      {
        method: 'GET',
        headers: {
          access: sessionStorage.getItem('access'),
        },
      },
    );
    if (response.ok) {
      let jsonResponse = await response.json();
      return jsonResponse[0];
    } else {
      sessionStorage.clear();
      this.router.transitionTo('login');
    }
  }
}
