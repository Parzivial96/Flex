import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service auth;
  @service router;

  async model() {
    let response = await fetch('http://localhost:8080/FlexAPI/getUser?id=3', {
      method: 'GET',
      headers: {
        access: sessionStorage.getItem('access'),
      },
    });

    let user = await response.json();
    return user[0];
  }
}
