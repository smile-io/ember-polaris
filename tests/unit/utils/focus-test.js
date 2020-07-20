import focus from 'dummy/utils/focus';
import { module, test } from 'qunit';

module('Unit | Utility | focus', function () {
  test("handleMouseUpByBlurring calls blur on the passed in event's currentTarget", function (assert) {
    let blurCalled = false;
    let mockEvent = {
      currentTarget: {
        blur() {
          blurCalled = true;
        },
      },
    };

    focus.handleMouseUpByBlurring(mockEvent);

    assert.ok(blurCalled, "blur called on event's currentTarget");
  });
});
