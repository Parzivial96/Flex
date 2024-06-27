import EmberRouter from '@ember/routing/router';
import config from 'flex/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('login');
  this.route('signup');
  this.route('forgotpassword');
  this.route('profile');
  this.route('myorders');
  this.route('cart');
  this.route('favorites');
  this.route('dashboard');
  this.route('manageUser');
  this.route('manageProduct');
  this.route('explore', { path: 'explore/:category' });
  this.route('editProduct', { path: 'editProduct/:id' });
  this.route('addProduct');
  this.route('preview', { path: 'preview/:id' });
  this.route('addUser');
  this.route('editUser', { path: 'editUser/:id' });
});
