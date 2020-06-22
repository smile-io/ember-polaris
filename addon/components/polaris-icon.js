import Component from '@ember/component';
import { computed } from '@ember/object';
import { equal } from '@ember/object/computed';
import { classify } from '@ember/string';
import { deprecate } from '@ember/application/deprecations';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-icon';
import SvgHandling from '../mixins/components/svg-handling';

// TODO: look into importing icons properly.
@tagName('')
@templateLayout(layout)
export default class PolarisIcon extends Component.extend(SvgHandling) {
  /**
   * The SVG contents to display in the icon
   * If the source doesn't have a slash in the name, it will look for Polaris
   * icons in the namespace specified by `sourcePath` property.
   *
   * @type {String}
   * @default null
   * @public
   */
  source = null;

  /**
   * Sets the color for the SVG fill
   *
   * @type {String}
   * @default null
   * @public
   */
  color = null;

  /**
   * Show a backdrop behind the icon
   *
   * @type {Boolean}
   * @default false
   * @public
   */
  backdrop = false;

  /**
   * Descriptive text to be read to screenreaders
   *
   * @type {String}
   * @default null
   * @public
   */
  accessibilityLabel = null;

  /**
   * Path under which `ember-svg-jar` serves the Polaris SVG icons
   *
   * @type {String}
   * @default 'polaris'
   * @public
   */
  sourcePath = 'polaris';

  /**
   * Whether the component should leave space for an icon
   *
   * @type {Boolean}
   */
  @equal('source', 'placeholder')
  showPlaceholder;

  /**
   * Whether a color has been specified for the icon
   *
   * @type {Boolean}
   */
  @computed('color')
  get isColored() {
    return this.color && this.color !== 'white';
  }

  /**
   * Final source for the icon SVG
   *
   * @type {String}
   */
  @computed('sourcePath', 'source')
  get iconSource() {
    let { source } = this;
    return source.indexOf('/') === -1 ? `${this.sourcePath}/${source}` : source;
  }

  @computed('color', 'isColored', 'backdrop')
  get classes() {
    let classes = ['Polaris-Icon'];
    if (this.color) {
      classes.push(`Polaris-Icon--color${classify(this.color)}`);
    }
    if (this.isColored) {
      classes.push('Polaris-Icon--isColored');
    }
    if (this.backdrop) {
      classes.push('Polaris-Icon--hasBackdrop');
    }

    return classes.join(' ');
  }

  init() {
    super.init(...arguments);

    deprecate(
      `[PolarisIcon] Passing 'class' argument is deprecated! Switch to angle bracket invocation and pass an HTML attribute instead`,
      !this.class,
      {
        id: 'ember-polaris.polaris-icon.class-arg',
        until: '6.0.0',
      }
    );
  }
}
