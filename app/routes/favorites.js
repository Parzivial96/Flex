import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class FavoritesRoute extends Route {
  @service router;
  @service favoriteData;

  async beforeModel(){
    if(sessionStorage.getItem('access')!=null){
      await this.favoriteData.fetchFavoriteData();
    }
    else {
      this.router.transitionTo('login');
    }
  }

  async model() {
    return this.favoriteData.favorites;
  }
}
