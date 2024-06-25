import { module, test } from 'qunit';
import { setupTest } from 'flex/tests/helpers';

module('Unit | Route | addProduct', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:add-product');
    assert.ok(route);
  });
});
