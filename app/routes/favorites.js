import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class FavoritesRoute extends Route {
  @service router;

  async model() {
    let response = await fetch('http://localhost:8080/FlexAPI/getFavorite', {
      method: 'GET',
      headers: {
        access: sessionStorage.getItem('access'),
      },
    });
    if (response.ok) {
      let favorites = await response.json();
      favorites.forEach((favorite) => {
        favorite.discountedPrice =
          favorite.price - favorite.price * (favorite.discount / 100);
      });
      return favorites;
    } else {
      sessionStorage.clear();
      this.router.transitionTo('login');
    }
  }
}
