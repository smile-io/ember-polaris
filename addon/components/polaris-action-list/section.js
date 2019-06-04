import { tagName, layout as templateLayout } from "@ember-decorators/component";
import { action, computed } from "@ember-decorators/object";
import Component from '@ember/component';
import { invokeAction } from 'ember-invoke-action';
import layout from '../../templates/components/polaris-action-list/section';

@tagName('')
@templateLayout(layout)
export default class Section extends Component {
  /**
   * Collection of action items
   *
   * @property section
   * @public
   * @type {Object}
   * @default null
   */
  section = null;

  /**
   * Whether the parent action list has multiple sections
   *
   * @property hasMultipleSections
   * @public
   * @type {Boolean}
   * @default false
   */
  hasMultipleSections = false;

  /**
   * Defines a specific role attribute for each action in the list
   *
   * @property actionRole
   * @public
   * @type {String}
   * @default null
   */
  actionRole = null;

  @(computed('actionRole').readOnly())
  get sectionRole() {
    return this.get('actionRole') === 'option' ? 'presentation' : undefined;
  }

  @action
  onItemAction(item, event) {
    event.preventDefault();
    event.stopPropagation();

    invokeAction(item, 'onAction');
    invokeAction(this, 'onActionAnyItem');
  }
}
