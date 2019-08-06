/* global window */

window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    {
      handler: 'throw',
      matchId: 'ember-polaris.polaris-description-list.term-component',
    },
    {
      handler: 'throw',
      matchId: 'ember-polaris.polaris-description-list.description-component',
    },
    { handler: 'throw', matchId: 'computed-property.override' },
    {
      handler: 'throw',
      matchId: 'ember-polaris.polaris-labelled.dataTestLabelled-arg',
    },
  ],
};
