import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class FavoritesController extends Controller {
  @service notification;
  @service favoriteData;

  @action
  async handleDeleteFavorite(productId) {
    this.favoriteData.handleDeleteFavorite(productId);
  }
}
