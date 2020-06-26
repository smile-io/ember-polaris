import EmberObject from '@ember/object';

/**
 * Helper class which stubs Math.random to return a controlled sequence of numbers.
 * When the end of the sequence is reached, it will begin again from the start.
 */
const MathRandomStubber = EmberObject.extend({
  /**
   * The sequence of "random" numbers to return.
   *
   * @public
   * @type {Array}
   */
  sequence: null,

  /**
   * Index of the last number returned.
   *
   * @private
   * @type {Number}
   */
  lastNumberIndex: -1,

  /**
   * Original Math.random to restore later.
   *
   * @private
   * @type {function}
   */
  originalMathRandom: null,

  stub() {
    if (this.get('originalMathRandom')) {
      return;
    }

    this.set('originalMathRandom', Math.random);
    let sequence = this.get('sequence');
    Math.random = () => {
      return sequence[
        this.incrementProperty('lastNumberIndex') % sequence.length
      ];
    };
  },

  restore() {
    let originalMathRandom = this.get('originalMathRandom');
    if (!originalMathRandom) {
      return;
    }

    Math.random = originalMathRandom;
    this.setProperties({
      originalMathRandom: null,
      lastNumberIndex: -1,
    });
  },

  init() {
    this._super(...arguments);
    this.stub();
  },

  willDestroy() {
    this.restore();
    this._super(...arguments);
  },
});

export default function stubMathRandom(...sequence) {
  return MathRandomStubber.create({ sequence });
}
