import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class ForgotpasswordController extends Controller {
    @tracked email = '';
    @tracked isLoading = false;
    @service notification;
    @service router;

    @action
    updateEmail(event) {
        this.email = event.target.value;
    }

    @action
    async handleForgotPassword() {
        this.isLoading = true;
        let response = await fetch('http://localhost:8080/FlexAPI/forgotPassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `to=${this.email}`,
        });

        this.isLoading = false;
        if (response.ok) {
            this.notification.showMessage('Email Sent 👍');
        this.router.transitionTo('login');
        }else{
            this.notification.showMessage('Please Try Again.');
        }
    }
}
