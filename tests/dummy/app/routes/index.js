import Route from '@ember/routing/route';

const samplePages = [
  {
    path: 'layout.annotated-layout',
    text: 'Annotated Layout',
  },
  {
    path: 'dropzone',
    text: 'Dropzone',
  },
  {
    path: 'test',
    text: 'Go to test route',
  },
  {
    path: 'test.child',
    text: 'Go to child route',
  },
];

export default Route.extend({
  model() {
    return samplePages;
  },
});
