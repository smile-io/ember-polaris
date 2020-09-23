import Component from '@glimmer/component';
import { action } from '@ember/object';
import { classify } from '@ember/string';

const COLORS_WITH_BACKDROPS = [
  'blueDark',
  'teal',
  'tealDark',
  'greenDark',
  'redDark',
  'yellowDark',
  'ink',
  'inkLighter',
];

export default class PolarisIconComponent extends Component {
  /**
   * The SVG contents to display in the icon
   * If the source doesn't have a slash in the name, it will look for Polaris
   * icons in the namespace specified by `sourcePath` property.
   *
   * @type {String}
   * @public
   */
  source;

  /**
   * Sets the color for the SVG fill
   *
   * @type {String}
   * @public
   */
  color;

  /**
   * Show a backdrop behind the icon
   *
   * @type {Boolean}
   * @public
   */
  backdrop;

  /**
   * Descriptive text to be read to screenreaders
   *
   * @type {String}
   * @public
   */
  accessibilityLabel;

  /**
   * Whether a color has been specified for the icon
   *
   * @type {Boolean}
   */
  get isColored() {
    return Boolean(this.args.color && this.args.color !== 'white');
  }

  get cssClasses() {
    let cssClasses = ['Polaris-Icon'];

    if (this.args.color) {
      cssClasses.push(`Polaris-Icon--color${classify(this.args.color)}`);
    }
    if (this.isColored) {
      cssClasses.push('Polaris-Icon--isColored');
    }
    if (this.args.backdrop) {
      cssClasses.push('Polaris-Icon--hasBackdrop');
    }
    // TODO #polaris-v5-newDesignLanguage add newDesignLanguage styles

    return cssClasses.join(' ');
  }

  get sourceType() {
    const { source } = this.args;
    let sourceType;

    if (source === 'placeholder') {
      sourceType = 'placeholder';
    } else if (typeof source === 'string') {
      // When a string, we assume this is an SVG ID recognized by `ember-svg-jar`
      sourceType = 'svg';
    } else {
      sourceType = 'external';
    }

    return sourceType;
  }

  @action
  validateArgs() {
    const { color, backdrop } = this.args;

    if (color && backdrop && !COLORS_WITH_BACKDROPS.includes(color)) {
      const colorsWithBackDrops = COLORS_WITH_BACKDROPS.join(', ');
      console.warn(
        `[PolarisIcon] The ${color} icon doesn’t accept backdrops. The icon colors that have backdrops are: ${colorsWithBackDrops}`
      );
    }

    // TODO #polaris-v5-newDesignLanguage
    // if (color && !newDesignLanguage && isNewDesignLanguageColor(color)) {
    //   console.warn(
    //     '[PolarisIcon] You have selected a color meant to be used in the new design language but new design language is not enabled.'
    //   );
    // }

    // if (
    //   color &&
    //   this.sourceType === 'external' &&
    //   newDesignLanguage === true &&
    //   isNewDesignLanguageColor(color)
    // ) {
    //   console.warn(
    //     '[PolarisIcon] Recoloring external SVGs is not supported with colors in the new design language. Set the intended color on your SVG instead.'
    //   );
    // }
  }
}
