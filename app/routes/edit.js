import Route from '@ember/routing/route';

export default class EditRoute extends Route {
  async model(params) {
    try {
      let response = await fetch(
        'http://localhost:8080/FlexAPI/getProduct?id=' + params.id,
        {
          method: 'GET',
          headers: {
            access: sessionStorage.getItem('access'),
          },
        },
      );

      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }

      let product = await response.json();

      return product[0];
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  }
}
