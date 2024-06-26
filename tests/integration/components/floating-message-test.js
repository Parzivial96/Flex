import { module, test } from 'qunit';
import { setupRenderingTest } from 'flex/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | floating-message', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<FloatingMessage />`);

    assert.dom().hasText('');

    // Template block usage:
    await render(hbs`
      <FloatingMessage>
        template block text
      </FloatingMessage>
    `);

    assert.dom().hasText('template block text');
  });
});
