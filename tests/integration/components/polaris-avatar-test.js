import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { findAll, find } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';

moduleForComponent('polaris-avatar', 'Integration | Component | polaris avatar', {
  integration: true
});

const avatarSelector = 'span.Polaris-Avatar[role="img"]';
const initialsSelector = buildNestedSelector(
  avatarSelector,
  'span.Polaris-Avatar__Initials'
);
const initialsTextSelector = buildNestedSelector(
  initialsSelector,
  'svg.Polaris-Avatar__Svg[viewbox="0 0 48 48"]',
  'text[x="50%"][y="50%"][dy="0.35em"][fill="currentColor"][font-size="26"][text-anchor="middle"]'
);
const imageSelector = buildNestedSelector(
  avatarSelector,
  'img.Polaris-Avatar__Image[alt=""][role="presentation"]'
);

test('it renders a correctly-styled avatar', function(assert) {
  this.render(hbs`{{polaris-avatar name=name initials=initials}}`);

  let avatars = findAll(avatarSelector);
  assert.equal(avatars.length, 1, 'renders one avatar');

  // Style should default to "style one".
  let avatar = avatars[0];
  assert.ok(avatar.classList.contains('Polaris-Avatar--styleOne'), 'no name or initials - applies style one class');

  this.set('initials', 'SBD');
  assert.ok(avatar.classList.contains('Polaris-Avatar--styleSix'), 'with initials - applies style six class');

  this.set('name', 'Jimmy');
  assert.ok(avatar.classList.contains('Polaris-Avatar--styleThree'), 'with name - applies style three class');
});

test('it renders a correctly-sized avatar', function(assert) {
  this.render(hbs`{{polaris-avatar size=size}}`);

  let avatars = findAll(avatarSelector);
  assert.equal(avatars.length, 1, 'renders one avatar');

  // Size should default to medium.
  let avatar = avatars[0];
  assert.notOk(avatar.classList.contains('Polaris-Avatar--sizeSmall'), 'no size - does not apply small size class');
  assert.ok(avatar.classList.contains('Polaris-Avatar--sizeMedium'), 'no size - applies medium size class');
  assert.notOk(avatar.classList.contains('Polaris-Avatar--sizeLarge'), 'no size - does not apply large size class');

  this.set('size', 'small');
  assert.ok(avatar.classList.contains('Polaris-Avatar--sizeSmall'), 'small size - applies small size class');
  assert.notOk(avatar.classList.contains('Polaris-Avatar--sizeMedium'), 'small size - does not apply medium size class');
  assert.notOk(avatar.classList.contains('Polaris-Avatar--sizeLarge'), 'small size - does not apply large size class');

  this.set('size', 'medium');
  assert.notOk(avatar.classList.contains('Polaris-Avatar--sizeSmall'), 'medium size - does not apply small size class');
  assert.ok(avatar.classList.contains('Polaris-Avatar--sizeMedium'), 'medium size - applies medium size class');
  assert.notOk(avatar.classList.contains('Polaris-Avatar--sizeLarge'), 'medium size - does not apply large size class');

  this.set('size', 'large');
  assert.notOk(avatar.classList.contains('Polaris-Avatar--sizeSmall'), 'large size - does not apply small size class');
  assert.notOk(avatar.classList.contains('Polaris-Avatar--sizeMedium'), 'large size - does not apply medium size class');
  assert.ok(avatar.classList.contains('Polaris-Avatar--sizeLarge'), 'large size - applies large size class');

  this.set('size', 'unsupported');
  assert.notOk(avatar.classList.contains('Polaris-Avatar--sizeSmall'), 'unsupported size - does not apply small size class');
  assert.ok(avatar.classList.contains('Polaris-Avatar--sizeMedium'), 'unsupported size - applies medium size class');
  assert.notOk(avatar.classList.contains('Polaris-Avatar--sizeLarge'), 'unsupported size - does not apply large size class');
});

test('it renders the correct accessibility label', function(assert) {
  this.render(hbs`
    {{polaris-avatar
      name=name
      initials=initials
      accessibilityLabel=accessibilityLabel
    }}`
  );

  let avatars = findAll(avatarSelector);
  assert.equal(avatars.length, 1, 'renders one avatar');

  let avatar = avatars[0];
  assert.equal(avatar.getAttribute('aria-label'), 'Avatar', 'no accessibilityLabel, name or initials - has the correct label');

  this.set('initials', 'PAT');
  assert.equal(avatar.getAttribute('aria-label'), 'Avatar with initials P A T', 'no accessibilityLabel or name, with initials - has the correct label');

  this.set('name', 'Ember Developer');
  assert.equal(avatar.getAttribute('aria-label'), 'Ember Developer', 'no accessibilityLabel, with name and initials - has the correct label');

  this.set('accessibilityLabel', 'Highly accessible');
  assert.equal(avatar.getAttribute('aria-label'), 'Highly accessible', 'with accessibilityLabel, name and initials - has the correct label');
});

test('it renders the correct initials markup', function(assert) {
  this.render(hbs`{{polaris-avatar initials=initials}}`);

  let avatars = findAll(avatarSelector);
  assert.equal(avatars.length, 1, 'renders one avatar');

  // Initials should only be rendered if supplied.
  let initials = find(initialsSelector);
  assert.notOk(initials, 'no initials - does not render any initials');

  this.set('initials', 'EPD');
  initials = find(initialsSelector);
  assert.ok(initials, 'with initials - renders initials element');

  let initialsText = find(initialsTextSelector);
  assert.ok(initialsText, 'with initials - renders the correct initials markup')
  assert.equal(initialsText.textContent.trim(), 'EPD', 'with initials - renders the correct initials');
});

test('it renders the correct image markup', function(assert) {
  this.render(hbs`{{polaris-avatar
    source=source
    customer=customer
    avatarSourcePath="https://my-avatar-images"
  }}`);

  let avatars = findAll(avatarSelector);
  assert.equal(avatars.length, 1, 'renders one avatar');

  let image = find(imageSelector);
  assert.notOk(image, 'without source or customer - does not render any image');

  this.set('source', 'http://www.somewhere.com/some-image.jpg');
  image = find(imageSelector);
  assert.ok(image, 'with source and no customer - renders an image');
  assert.equal(image.src, 'http://www.somewhere.com/some-image.jpg', 'with source and no customer - renders the correct image');

  this.set('customer', true);
  image = find(imageSelector);
  assert.ok(image, 'with source and customer - renders an image');
  assert.equal(image.src, 'http://www.somewhere.com/some-image.jpg', 'with source and customer - renders the correct image');

  this.set('source', null);
  image = find(imageSelector);
  assert.ok(image, 'without source and with customer - renders an image');
  assert.equal(image.src, 'https://my-avatar-images/avatar-1.svg', 'without source and with customer - renders the correct image');
});
