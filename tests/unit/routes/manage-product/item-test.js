import { module, test } from 'qunit';
import { setupTest } from 'flex/tests/helpers';

module('Unit | Route | manageProduct/item', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:manage-product/item');
    assert.ok(route);
  });
});
