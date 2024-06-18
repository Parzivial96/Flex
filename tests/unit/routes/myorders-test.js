import { module, test } from 'qunit';
import { setupTest } from 'flex/tests/helpers';

module('Unit | Route | myorders', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:myorders');
    assert.ok(route);
  });
});
