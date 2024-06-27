import { module, test } from 'qunit';
import { setupTest } from 'flex/tests/helpers';

module('Unit | Controller | forgotpassword', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:forgotpassword');
    assert.ok(controller);
  });
});
