import { module, test } from 'qunit';
import { setupTest } from 'flex/tests/helpers';

module('Unit | Service | order', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:order');
    assert.ok(service);
  });
});
