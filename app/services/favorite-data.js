import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class FavoriteDataService extends Service {
  @tracked favorites = null;
  @service notification;

  async fetchFavoriteData() {
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
      this.favorites = favorites;
    } else {
      sessionStorage.clear();
      this.router.transitionTo('login');
    }
  }

  async handleDeleteFavorite(productId) {
    let response = await fetch('http://localhost:8080/FlexAPI/deleteFavorite', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `productId=${productId}`,
    });
    if (response.ok) {
      location.reload();
    } else {
      this.notification.showMessage("Can't remove from favorite. Try again.");
    }
  }

  async handleAddFavorite(productId) {
    let response = await fetch('http://localhost:8080/FlexAPI/addFavorite', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `productId=${productId}`,
    });
    if (response.ok) {
      location.reload();
    } else {
      this.notification.showMessage("Can't add to favorite. Try again.");
    }
  }
}
