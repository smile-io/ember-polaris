import Component from '@ember/component';
import { computed, action } from '@ember/object';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/polaris-unstyled-link';
import TaglessCssDeprecation from '../mixins/tagless-css-deprecation';

/**
 * Undocumented Polaris UnstyledLink component.
 * Note that we do not support the custom link
 * component behaviour provided by the React
 * implementation at this point.
 */
@tagName('')
@layout(template)
export default class PolarisUnstyledLinkComponent extends Component.extend(
  TaglessCssDeprecation
) {
  /**
   * Content to display inside the link
   *
   * @type {String}
   * @default null
   * @public
   */
  text = null;

  /**
   * A destination to link to
   *
   * @type {String}
   * @default null
   * @public
   *
   */
  url = null;

  /**
   * Forces url to open in a new tab
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  external = false;

  /**
   * Tells the browser to download the url instead of opening it. Provides a hint for the downloaded filename if it is a string value.
   *
   * @type {String|Boolean}
   * @default null
   * @public
   */
  download = null;

  /**
   * Accessibility label
   *
   * @type {String}
   * @default null
   * @public
   */
  ariaLabel = null;

  /**
   * @type {String}
   * @default null
   * @public
   */
  ariaDescribedBy = null;

  /**
   * Callback when a link is clicked
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onClick() {}

  /**
   * Callback when a link is focused
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onFocus() {}

  /**
   * Callback when a link is blured
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onBlur() {}

  /**
   * Callback for mouseup event
   *
   * @type {Function}
   * @default noop
   * @public
   */
  onMouseUp() {}

  /** @deprecated */
  dataTestId = null;

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
        until: '7.0.0',
      }
    );
    deprecate(
      `[polaris-unstyled-link] Passing 'dataPolarisUnstyled' is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.dataPolarisUnstyled,
      {
        id: 'ember-polaris.polaris-unstyled-link.dataPolarisUnstyled-arg',
        until: '7.0.0',
      }
    );
    deprecate(
      `[polaris-unstyled-link] Passing 'id' is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.id,
      {
        id: 'ember-polaris.polaris-unstyled-link.id-arg',
        until: '7.0.0',
      }
    );
  }

  @action
  handleClick(event) {
    event.stopPropagation();
    this.onClick();
  }
}
