import Component from '@ember/component';
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import layout from '../templates/components/polaris-description-list';
import deprecateClassArgument from '../utils/deprecate-class-argument';

@deprecateClassArgument
@tagName('')
@templateLayout(layout)
export default class PolarisDescriptionList extends Component {
  /**
   * Collection of items for list
   *
   * format with `term` and `description` keys:
   *
   * [{
   *   term: 'Term here',
   *   description: 'Description here'
   * }]
   *
   * values can also be set to custom components:
   *
   * items=(array
   *   (hash
   *     term=(component "my-term-component")
   *     description=(component "my-description-component")
   *   )
   * )
   *
   * @type {Array}
   * @default []
   * @public
   */
  items = [];
}
