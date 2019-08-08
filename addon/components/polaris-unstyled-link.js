import Component from '@ember/component';
import { computed } from '@ember/object';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-unstyled-link';

/**
 * Undocumented Polaris UnstyledLink component.
 * Note that we do not support the custom link
 * component behaviour provided by the React
 * implementation at this point.
 */
@tagName('')
@layout(template)
export default class PolarisUnstyledLinkComponent extends Component {
  /**
   * Content to display inside the link
   *
   * @property text
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * A destination to link to
   *
   * @property url
   * @type {String}
   * @default null
   * @public
   *
   */
  url = null;

  /**
   * Forces url to open in a new tab
   *
   * @property external
   * @type {Boolean}
   * @default false
   * @public
   */
  external = false;

  /**
   * Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value.
   *
   * @property download
   * @type {String|Boolean}
   * @default null
   * @public
   */
  download = null;

  /**
   * Accessibility label
   *
   * @property ariaLabel
   * @type {String}
   * @default null
   * @public
   */
  ariaLabel = null;

  /**
   * @property ariaDescribedBy
   * @type {String}
   * @default null
   * @public
   */
  ariaDescribedBy = null;

  /**
   * Callback when a link is clicked
   *
   * @property onClick
   * @type {Function}
   * @default noop
   * @public
   */
  onClick() {}

  /** @private */
  dataPolarisUnstyled = 'true';

  /** @deprecated */
  dataTestId = null;

  // TODO what/where are these options coming from?!
  // click: mapEventToAction('onClick', {
  //   preventDefault: false,
  //   stopPropagation: true,
  // }),

  @computed('external')
  get target() {
    return this.external ? '_blank' : null;
  }

  @computed('external')
  get rel() {
    return this.external ? 'noopener noreferrer' : null;
  }

  init() {
    super.init(...arguments);

    deprecate(
      `[polaris-unstyled-link] Passing 'dataTestId' is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.dataTestId,
      {
        id: 'ember-polaris.polaris-unstyled-link.dataTestId-arg',
        until: '6.0.0',
      }
    );
  }
}
