import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ExploreController extends Controller {
    @service favoriteData;

    @action
    togleFavorite(productId, isFavorite){
        if(isFavorite){
            //deleteFavorite
            this.favoriteData.handleDeleteFavorite(productId);
        } else{
            //addFavorite
            this.favoriteData.handleAddFavorite(productId);
        }
    }
}
