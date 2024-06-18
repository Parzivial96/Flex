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
  this.route('about');
  this.route('profile');
  this.route('adduser');
  this.route('myorders');
  this.route('cart');
  this.route('favorites');
});
