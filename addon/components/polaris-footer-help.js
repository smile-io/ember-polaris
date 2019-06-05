import {
  classNames,
  layout as templateLayout,
} from '@ember-decorators/component';
import Component from '@ember/component';
import layout from '../templates/components/polaris-footer-help';

/**
 * Polaris footer help component.
 * See https://polaris.shopify.com/components/titles-and-text/footer-help
 */
@classNames('Polaris-FooterHelp')
@templateLayout(layout)
export default class PolarisFooterHelp extends Component {
  /**
   * The content to display inside the layout.
   *
   * This component can be used in block form,
   * in which case the block content will be used
   * instead of `text`
   *
   * @property text
   * @type {string}
   * @default: null
   * @public
   */
  text = null;
}
