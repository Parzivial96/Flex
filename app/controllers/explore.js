import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ExploreController extends Controller {
    @service favoriteData;
    @tracked test = "hello";

    @action
    togleFavorite(productId, isFavorite){
        if(isFavorite){
            this.favoriteData.handleDeleteFavorite(productId);
        } else{
            this.favoriteData.handleAddFavorite(productId);
        }
    }
}
