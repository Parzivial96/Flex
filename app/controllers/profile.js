import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProfileController extends Controller {
  isImageUploadVisible = false;
  selectedImage = null;
  @service userData;
  @service notification;

  @action
  showImageUpload() {
    this.set('isImageUploadVisible', true);
  }

  @action
  hideImageUpload() {
    this.set('isImageUploadVisible', false);
    this.set('selectedImage', null);
  }

  @action
  handleImageChange(event) {
    this.selectedImage = event.target.files[0];
  }

  @action
  saveImage() {
    if (this.selectedImage) {
      this.uploadImage(this.selectedImage);
    }
    this.hideImageUpload();
  }

  async uploadImage(dp) {
    let formData = new FormData();
    formData.append('id', this.userData.user.id);
    formData.append('dp', dp);

    let response = await fetch('http://localhost:8080/FlexAPI/updateUser', {
      method: 'POST',
      headers: {
        access: sessionStorage.getItem('access'),
      },
      body: formData,
    });

    if (response.ok) {
      this.notification.showMessage('DP Updated 👍');
      setTimeout(function () {
        location.reload();
      }, 5000);
    } else {
      this.router.transitionTo('login');
    }
  }
}
