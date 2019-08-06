/* global window */

window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    {
      handler: 'silence',
      matchId: 'ember-polaris.polaris-description-list.term-component',
    },
    {
      handler: 'silence',
      matchId: 'ember-polaris.polaris-description-list.description-component',
    },
    { handler: 'silence', matchId: 'computed-property.override' },
    {
      handler: 'silence',
      matchId: 'ember-polaris.polaris-labelled.dataTestLabelled-arg',
    },
  ],
};
