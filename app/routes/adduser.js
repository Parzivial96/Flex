import Route from '@ember/routing/route';

export default class AdduserRoute extends Route {
  async model() {
    let response = await fetch('http://localhost:8080/FlexAPI/getUser');
    let data = await response.json();
    console.log(data[2]);
    return data[2];
  }
}
