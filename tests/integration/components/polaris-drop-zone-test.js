import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { find, render, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { capitalize, htmlSafe } from '@ember/string';
import { selectFiles } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';
import MockEvent from '@smile-io/ember-polaris/test-support/mock-drop-zone-event';
import {
  smallSizeWidthLimit,
  mediumSizeWidthLimit,
  largeSizeWidthLimit,
} from '@smile-io/ember-polaris/utils/drop-zone';

// NOTE: Doubling the size because of the wrapping #ember-testing container which has a 200% width and
// transform scale of 0.5
const smallWidth = 2 * (smallSizeWidthLimit - 1);
const mediumWidth = 2 * (mediumSizeWidthLimit - 1);
const largeWidth = 2 * (largeSizeWidthLimit - 1);

const origGetBoundingClientRect = Element.prototype.getBoundingClientRect;
const widths = {
  small: 99,
  medium: 159,
  large: 299,
  extraLarge: 1024,
};

module('Integration | Component | polaris-drop-zone', function(hooks) {
  hooks.afterEach(function() {
    Element.prototype.getBoundingClientRect = origGetBoundingClientRect;
  });

  setupRenderingTest(hooks);

  const uploadedFiles = [
    {
      name: 'jpeg file',
      type: 'image/jpeg',
    },
    {
      name: 'svg file',
      type: 'image/svg',
    },
    {
      name: 'pdf file',
      type: 'application/pdf',
    },
  ];

  const duplicateFiles = [
    {
      name: 'jpegs files',
      type: 'image/jpeg',
    },
    {
      name: 'svg file',
      type: 'image/svg',
    },
  ];

  const dropZoneSelector = '[data-test-drop-zone]';
  const containerSelector = '[data-test-drop-zone-container]';
  // Hidden dropzone input element
  const inputSelector = '[data-test-drop-zone-hidden-input]';

  // Overlays
  const dropZoneOverlaySelector = '[data-test-drop-zone-overlay]';
  const dropZoneOverlayStackSelector = buildNestedSelector(
    dropZoneOverlaySelector,
    '[data-test-stack]'
  );
  const dropZoneOverlayStackItemSelector = buildNestedSelector(
    dropZoneOverlayStackSelector,
    '[data-test-stack-item]'
  );
  const dropZoneOverlayIconSelector = buildNestedSelector(
    dropZoneOverlayStackItemSelector,
    '[data-test-icon]'
  );
  const dropZoneOverlayIconSVGSelector = buildNestedSelector(
    dropZoneOverlayIconSelector,
    'svg'
  );
  const dropZoneOverlayTextSelector = buildNestedSelector(
    dropZoneOverlayStackItemSelector,
    '[data-test-display-text]'
  );
  const dropZoneOverlayCaptionSelector = buildNestedSelector(
    dropZoneOverlayStackItemSelector,
    '[data-test-caption]'
  );
  const dropZoneLabelWrapperSelector = '[data-test-labelled]';
  const dropZoneLabelButtonSelector = `${dropZoneLabelWrapperSelector} button`;

  test('it renders in inline form', async function(assert) {
    assert.expect(8);

    await render(hbs`{{polaris-drop-zone}}`);

    // Defaults
    assert.dom(dropZoneSelector).exists('has Polaris-DropZone class');
    assert
      .dom(dropZoneSelector)
      .hasClass('Polaris-DropZone--hasOutline', 'has outline class');
    assert
      .dom(dropZoneSelector)
      .hasClass(
        'Polaris-DropZone--sizeExtraLarge',
        'has extra large size class'
      );

    assert.dom(containerSelector).exists('has the DropZone container element');

    assert.dom(inputSelector).exists('has the input element hidden');
    assert
      .dom(inputSelector)
      .hasAttribute(
        'autocomplete',
        'off',
        'input element has attribute autocomplete `off`'
      );
    assert
      .dom(inputSelector)
      .hasAttribute('multiple', '', 'input element has attribute multiple');
    assert
      .dom(inputSelector)
      .hasAttribute('type', 'file', 'input element has attribute type `file`');
  });

  test('it supports `outline` property', async function(assert) {
    assert.expect(2);

    this.set('outline', true);

    await render(hbs`{{polaris-drop-zone outline=outline}}`);

    assert
      .dom(dropZoneSelector)
      .hasClass('Polaris-DropZone--hasOutline', 'has outline class');

    this.set('outline', false);
    assert
      .dom(dropZoneSelector)
      .doesNotHaveClass(
        'Polaris-DropZone--hasOutline',
        'if `outline` is false, it does not have  outline class'
      );
  });

  test('it supports `disabled` property', async function(assert) {
    assert.expect(4);

    await render(hbs`{{polaris-drop-zone disabled=disabled}}`);

    assert
      .dom(dropZoneSelector)
      .doesNotHaveAttribute(
        'aria-disabled',
        'if `disabled` is not provided, dropzone does not have `aria-label` attribute'
      );
    assert
      .dom(inputSelector)
      .isNotDisabled(
        'if `disabled` is not provided, input does not have `disabled` attribute'
      );

    this.set('disabled', true);
    assert
      .dom(dropZoneSelector)
      .hasAttribute(
        'aria-disabled',
        'true',
        '`aria-disabled` attribute set, if `disabled` is true'
      );
    assert
      .dom(inputSelector)
      .isDisabled('if `disabled` is true, input is disabled');
  });

  test('it supports `accept` property', async function(assert) {
    assert.expect(2);

    await render(hbs`{{polaris-drop-zone accept=accept}}`);

    assert
      .dom(inputSelector)
      .doesNotHaveAttribute(
        'accept',
        'if `accept` is not provided, input does not have `accept` attribute'
      );

    this.set('accept', 'image/*');
    assert
      .dom(inputSelector)
      .hasAttribute('accept', 'image/*', '`accept` attribute properly set');
  });

  test('it supports `error` && `errorOverlayText` properties', async function(assert) {
    assert.expect(3);

    let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });
    await render(
      hbs`{{polaris-drop-zone error=error errorOverlayText=errorOverlayText}}`
    );
    await triggerEvent(dropZoneSelector, 'dragenter', event);

    assert
      .dom(dropZoneSelector)
      .doesNotHaveClass(
        'Polaris-DropZone--hasError',
        'if `error` is not provided, dropzone does not have error class'
      );

    this.setProperties({
      error: true,
      errorOverlayText: 'Something went haywire!',
    });
    assert
      .dom(dropZoneSelector)
      .hasClass(
        'Polaris-DropZone--hasError',
        'if `error` is true, dropzone has error class'
      );
    assert
      .dom(dropZoneOverlayTextSelector)
      .hasText(
        'Something went haywire!',
        'dropzone error overlay has proper text'
      );
  });

  test('it supports `overlayText` property', async function(assert) {
    assert.expect(2);

    this.set('overlay', true);
    let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });
    await render(
      hbs`{{polaris-drop-zone overlay=overlay overlayText=overlayText}}`
    );
    await triggerEvent(dropZoneSelector, 'dragenter', event);

    this.set('overlayText', 'Something draggin here!');
    assert
      .dom(dropZoneOverlayTextSelector)
      .hasText('Something draggin here!', 'dropzone overlay has proper text');

    this.set('overlay', false);
    assert
      .dom(dropZoneOverlayTextSelector)
      .doesNotExist('dropzone overlay is not rendered when overlay is false');
  });

  test('it handles sizing property based on the parent element', async function(assert) {
    await render(hbs`
      <div style={{style}}>
        {{polaris-drop-zone}}
      </div>
    `);

    assert
      .dom(dropZoneSelector)
      .hasClass('Polaris-DropZone--sizeExtraLarge', 'has extra large class');

    this.set('style', htmlSafe(`width: ${largeWidth}px;`));
    await triggerEvent(window, 'resize');
    await settled();
    assert
      .dom(dropZoneSelector)
      .hasClass('Polaris-DropZone--sizeLarge', 'has large class');

    this.set('style', htmlSafe(`width: ${mediumWidth}px;`));
    await triggerEvent(window, 'resize');
    await settled();
    assert
      .dom(dropZoneSelector)
      .hasClass('Polaris-DropZone--sizeMedium', 'has medium class');

    this.set('style', htmlSafe(`width: ${smallWidth}px;`));
    await triggerEvent(window, 'resize');
    await settled();
    assert
      .dom(dropZoneSelector)
      .hasClass('Polaris-DropZone--sizeSmall', 'has small class');
  });

  module('rendering', function() {
    test('renders properly during drag events', async function(assert) {
      assert.expect(28);

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-drop-zone accept=accept}}`);
      await triggerEvent(dropZoneSelector, 'dragenter', event);

      assert
        .dom(dropZoneSelector)
        .hasClass(
          'Polaris-DropZone--isDragging',
          'has isDragging class when dragging'
        );
      assert
        .dom(dropZoneSelector)
        .doesNotHaveClass(
          'Polaris-DropZone--hasError',
          'does not have hasError class when dragging and no rejected files'
        );
      assert
        .dom(dropZoneOverlayStackSelector)
        .exists('dropzone overlay wraps content in a stack');
      assert
        .dom(dropZoneOverlayStackSelector)
        .hasClass(
          'Polaris-Stack--vertical',
          'dropzone overlay stack is vertically aligned'
        );
      assert
        .dom(dropZoneOverlayStackSelector)
        .hasClass(
          'Polaris-Stack--spacingTight',
          'dropzone overlay stack has tight spacing'
        );
      assert
        .dom(dropZoneOverlayIconSelector)
        .hasClass(
          'Polaris-Icon--colorIndigo',
          'dropzone overlay icon has colorIndigo class'
        );
      assert
        .dom(dropZoneOverlayIconSelector)
        .hasClass(
          'Polaris-Icon--isColored',
          'dropzone overlay icon has isColored class'
        );
      assert
        .dom(dropZoneOverlayIconSVGSelector)
        .hasAttribute(
          'data-icon-source',
          'polaris/drag-drop',
          'dropzone overlay icon SVG is `drag-drop`'
        );
      assert
        .dom(dropZoneOverlayTextSelector)
        .hasClass(
          'Polaris-DisplayText--sizeSmall',
          'dropzone overlay text has sizeSmall class'
        );
      assert
        .dom(dropZoneOverlayTextSelector)
        .hasText('Drop file to upload', 'dropzone overlay has proper text');
      assert
        .dom(dropZoneOverlayCaptionSelector)
        .doesNotExist('dropzone overlay does not have caption text');

      await triggerEvent(dropZoneSelector, 'dragleave', event);

      assert
        .dom(dropZoneSelector)
        .doesNotHaveClass(
          'Polaris-DropZone--isDragging',
          'does not have isDragging class when dragging'
        );
      assert
        .dom(dropZoneOverlaySelector)
        .doesNotExist('once no longer dragging, overlay not shown');
      assert
        .dom(dropZoneSelector)
        .doesNotHaveClass(
          'Polaris-DropZone--isDragging',
          'does not have isDragging class when dragging done'
        );

      // Test that it shows error state
      this.set('accept', 'image/*');

      await triggerEvent(dropZoneSelector, 'dragenter', event);

      assert
        .dom(dropZoneSelector)
        .hasClass(
          'Polaris-DropZone--isDragging',
          'has isDragging class when dragging'
        );
      assert
        .dom(dropZoneSelector)
        .hasClass(
          'Polaris-DropZone--hasError',
          'has hasError class when dragging and there are rejected files'
        );
      assert
        .dom(dropZoneOverlayStackSelector)
        .exists('dropzone error overlay wraps content in a stack');
      assert
        .dom(dropZoneOverlayStackSelector)
        .hasClass(
          'Polaris-Stack--vertical',
          'dropzone error overlay stack is vertically aligned'
        );
      assert
        .dom(dropZoneOverlayStackSelector)
        .hasClass(
          'Polaris-Stack--spacingTight',
          'dropzone error overlay stack has tight spacing'
        );
      assert
        .dom(dropZoneOverlayIconSelector)
        .hasClass(
          'Polaris-Icon--colorRed',
          'dropzone error overlay icon has colorRed class'
        );
      assert
        .dom(dropZoneOverlayIconSelector)
        .hasClass(
          'Polaris-Icon--isColored',
          'dropzone error overlay icon has isColored class'
        );
      assert
        .dom(dropZoneOverlayIconSVGSelector)
        .hasAttribute(
          'data-icon-source',
          'polaris/alert-circle',
          'dropzone error overlay icon SVG is `alert-circle`'
        );
      assert
        .dom(dropZoneOverlayTextSelector)
        .hasClass(
          'Polaris-DisplayText--sizeSmall',
          'dropzone error overlay text has sizeSmall class'
        );
      assert
        .dom(dropZoneOverlayTextSelector)
        .hasText(
          'File type is not valid',
          'dropzone error overlay has proper text'
        );
      assert
        .dom(dropZoneOverlayCaptionSelector)
        .doesNotExist('dropzone error overlay does not have caption text');

      await triggerEvent(dropZoneSelector, 'dragleave', event);

      assert
        .dom(dropZoneSelector)
        .doesNotHaveClass(
          'Polaris-DropZone--isDragging',
          'does not have isDragging class when dragging is done'
        );
      assert
        .dom(dropZoneSelector)
        .doesNotHaveClass(
          'Polaris-DropZone--hasError',
          'does not have hasError class when dragging is done'
        );
      assert
        .dom(dropZoneOverlaySelector)
        .doesNotExist('once no longer dragging, overlay not shown');
    });

    /**
     * Testing dropzone when the `size` is `extraLarge`
     */
    module('when size is extraLarge', function() {
      const fileUploadSelector = buildNestedSelector(
        containerSelector,
        '.Polaris-DropZone-FileUpload'
      );
      const fileUploadStackSelector = buildNestedSelector(
        fileUploadSelector,
        '.Polaris-Stack'
      );
      const fileUploadStackItemSelector = buildNestedSelector(
        fileUploadStackSelector,
        '.Polaris-Stack__Item'
      );
      const fileUploadImageSelector = buildNestedSelector(
        fileUploadStackItemSelector,
        '.Polaris-DropZone-FileUpload__Image'
      );
      const fileUploadButtonTextSelector = buildNestedSelector(
        fileUploadStackItemSelector,
        'button.Polaris-Button',
        '.Polaris-Button__Content',
        'span'
      );
      const fileUploadTextSelector = buildNestedSelector(
        fileUploadStackItemSelector,
        '.Polaris-TextStyle--variationSubdued'
      );

      test('it renders properly with FileUpload', async function(assert) {
        assert.expect(12);

        await render(hbs`
          {{#polaris-drop-zone type=type as |dropZone|}}
            {{dropZone.fileUpload}}
          {{/polaris-drop-zone}}
        `);

        assert.dom(fileUploadSelector).exists('renders FileUpload component');
        assert
          .dom(fileUploadStackSelector)
          .exists('fileUpload wraps content in a stack');
        assert
          .dom(fileUploadStackSelector)
          .hasClass(
            'Polaris-Stack--vertical',
            'fileUpload stack is vertically aligned'
          );
        assert
          .dom(fileUploadImageSelector)
          .exists('fileUpload image is rendered');
        assert.equal(
          find(fileUploadImageSelector).dataset.iconSource,
          'file-upload',
          'fileUpload has correct image set'
        );
        assert
          .dom(fileUploadImageSelector)
          .hasClass(
            'Polaris-DropZone-FileUpload--sizeExtraLarge',
            '',
            'fileUpload has extra large class'
          );
        assert
          .dom(fileUploadButtonTextSelector)
          .hasText('Add file', 'fileUpload button has correct text');
        assert
          .dom(fileUploadTextSelector)
          .hasText('or drop files to upload', 'fileUpload has correct text');

        this.set('type', 'image');

        assert.equal(
          find(fileUploadImageSelector).dataset.iconSource,
          'image-upload',
          'fileUpload has correct image set when image-type dropzone'
        );
        assert
          .dom(fileUploadImageSelector)
          .hasClass(
            'Polaris-DropZone-FileUpload--sizeExtraLarge',
            '',
            'fileUpload has extra large class'
          );
        assert
          .dom(fileUploadButtonTextSelector)
          .hasText(
            'Add image',
            'fileUpload button has correct text when image-type dropzone'
          );
        assert
          .dom(fileUploadTextSelector)
          .hasText(
            'or drop images to upload',
            'fileUpload has correct text when image-type dropzone'
          );
      });
    });

    module('when size is large', function() {
      const fileUploadSelector = buildNestedSelector(
        containerSelector,
        '.Polaris-DropZone-FileUpload'
      );
      const fileUploadStackSelector = buildNestedSelector(
        fileUploadSelector,
        '.Polaris-Stack'
      );
      const fileUploadStackItemSelector = buildNestedSelector(
        fileUploadStackSelector,
        '.Polaris-Stack__Item'
      );
      const fileUploadImageSelector = buildNestedSelector(
        fileUploadStackItemSelector,
        '.Polaris-DropZone-FileUpload__Image'
      );
      const fileUploadButtonTextSelector = buildNestedSelector(
        fileUploadStackItemSelector,
        'button.Polaris-Button',
        '.Polaris-Button__Content',
        'span'
      );
      const fileUploadCaptionSelector = buildNestedSelector(
        fileUploadStackItemSelector,
        '.Polaris-Caption',
        '.Polaris-TextStyle--variationSubdued'
      );

      test('it renders properly with FileUpload', async function(assert) {
        assert.expect(14);

        this.set('style', htmlSafe(`width: ${largeWidth}px;`));
        await render(hbs`
          <div style={{style}}>
            {{#polaris-drop-zone type=type as |dropZone|}}
              {{dropZone.fileUpload}}
            {{/polaris-drop-zone}}
          </div>
        `);

        assert.dom(fileUploadSelector).exists('renders FileUpload component');
        assert
          .dom(fileUploadStackSelector)
          .exists('fileUpload wraps content in a stack');
        assert
          .dom(fileUploadStackSelector)
          .hasClass(
            'Polaris-Stack--vertical',
            'fileUpload stack is vertically aligned'
          );
        assert
          .dom(fileUploadStackSelector)
          .hasClass(
            'Polaris-Stack--spacingTight',
            'fileUpload stack has tight spacing'
          );
        assert
          .dom(fileUploadImageSelector)
          .exists('fileUpload image is rendered');
        assert.equal(
          find(fileUploadImageSelector).dataset.iconSource,
          'file-upload',
          'fileUpload has correct image set'
        );
        assert
          .dom(fileUploadImageSelector)
          .hasClass(
            'Polaris-DropZone-FileUpload--sizeLarge',
            '',
            'fileUpload has large class'
          );
        assert
          .dom(fileUploadButtonTextSelector)
          .hasText('Add file', 'fileUpload button has correct text');
        assert
          .dom('.Polaris-Button')
          .hasClass('Polaris-Button--sizeSlim', 'fileUpload button is slim');
        assert
          .dom(fileUploadCaptionSelector)
          .hasText(
            'or drop files to upload',
            'fileUpload caption has correct text'
          );

        this.set('type', 'image');

        assert.equal(
          find(fileUploadImageSelector).dataset.iconSource,
          'image-upload',
          'fileUpload has correct image set when image-type dropzone'
        );
        assert
          .dom(fileUploadImageSelector)
          .hasClass(
            'Polaris-DropZone-FileUpload--sizeLarge',
            '',
            'fileUpload has large class'
          );
        assert
          .dom(fileUploadButtonTextSelector)
          .hasText('Add image', 'fileUpload button has correct text');
        assert
          .dom(fileUploadCaptionSelector)
          .hasText(
            'or drop images to upload',
            'fileUpload has correct text when image-type dropzone'
          );
      });

      test('renders properly during drag events', async function(assert) {
        assert.expect(4);

        let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

        this.set('style', htmlSafe(`width: ${largeWidth}px;`));
        await render(hbs`
          <div style={{style}}>
            {{#polaris-drop-zone accept=accept as |dropZone|}}
              {{dropZone.fileUpload}}
            {{/polaris-drop-zone}}
          </div>
        `);

        await triggerEvent(dropZoneSelector, 'dragenter', event);

        assert
          .dom(dropZoneOverlayTextSelector)
          .doesNotExist('dropzone overlay does not have display text');
        assert
          .dom(dropZoneOverlayCaptionSelector)
          .hasText(
            'Drop file to upload',
            'dropzone overlay caption has proper text'
          );

        // Test that it shows error state
        this.set('accept', 'image/*');

        assert
          .dom(dropZoneOverlayTextSelector)
          .doesNotExist('dropzone error overlay does not have display text');
        assert
          .dom(dropZoneOverlayCaptionSelector)
          .hasText(
            'Drop file to upload',
            'dropzone error overlay caption has proper text'
          );
      });
    });

    module('when size is medium', function() {
      const fileUploadSelector = buildNestedSelector(
        containerSelector,
        '.Polaris-DropZone-FileUpload'
      );
      const fileUploadStackSelector = buildNestedSelector(
        fileUploadSelector,
        '.Polaris-Stack'
      );
      const fileUploadStackItemSelector = buildNestedSelector(
        fileUploadStackSelector,
        '.Polaris-Stack__Item'
      );
      const fileUploadLinkSelector = buildNestedSelector(
        fileUploadStackItemSelector,
        'button.Polaris-Link'
      );
      const fileUploadCaptionSelector = buildNestedSelector(
        fileUploadStackItemSelector,
        '.Polaris-Caption'
      );

      test('it renders properly with FileUpload', async function(assert) {
        assert.expect(8);

        this.set('style', htmlSafe(`width: ${mediumWidth}px;`));
        await render(hbs`
          <div style={{style}}>
            {{#polaris-drop-zone type=type as |dropZone|}}
              {{dropZone.fileUpload}}
            {{/polaris-drop-zone}}
          </div>
        `);

        assert.dom(fileUploadSelector).exists('renders FileUpload component');
        assert
          .dom(fileUploadStackSelector)
          .exists('fileUpload wraps content in a stack');
        assert
          .dom(fileUploadStackSelector)
          .hasClass(
            'Polaris-Stack--vertical',
            'fileUpload stack is vertically aligned'
          );
        assert
          .dom(fileUploadStackSelector)
          .hasClass(
            'Polaris-Stack--spacingTight',
            'fileUpload stack has tight spacing'
          );
        assert
          .dom(fileUploadLinkSelector)
          .hasText('Add file', 'fileUpload link has correct text');
        assert
          .dom(fileUploadCaptionSelector)
          .hasText(
            'or drop files to upload',
            'fileUpload caption has correct text'
          );

        this.set('type', 'image');

        assert
          .dom(fileUploadLinkSelector)
          .hasText(
            'Add image',
            'fileUpload link has correct text when image-type dropzone'
          );
        assert
          .dom(fileUploadCaptionSelector)
          .hasText(
            'or drop images to upload',
            'fileUpload has correct text when image-type dropzone'
          );
      });

      test('renders properly during drag events', async function(assert) {
        assert.expect(4);

        let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

        this.set('style', htmlSafe(`width: ${mediumWidth}px;`));
        await render(hbs`
          <div style={{style}}>
            {{#polaris-drop-zone accept=accept as |dropZone|}}
              {{dropZone.fileUpload}}
            {{/polaris-drop-zone}}
          </div>
        `);

        await triggerEvent(dropZoneSelector, 'dragenter', event);

        assert
          .dom(dropZoneOverlayTextSelector)
          .doesNotExist('dropzone overlay does not have display text');
        assert
          .dom(dropZoneOverlayCaptionSelector)
          .hasText(
            'Drop file to upload',
            'dropzone overlay caption has proper text'
          );

        // Test that it shows error state
        this.set('accept', 'image/*');

        assert
          .dom(dropZoneOverlayTextSelector)
          .doesNotExist('dropzone error overlay does not have display text');
        assert
          .dom(dropZoneOverlayCaptionSelector)
          .hasText(
            'Drop file to upload',
            'dropzone error overlay caption has proper text'
          );
      });
    });

    module('when size is small', function(hooks) {
      hooks.beforeEach(function() {
        this.owner.register('component:svg-jar', MockSvgJarComponent);
      });

      const fileUploadSelector = buildNestedSelector(
        containerSelector,
        '.Polaris-DropZone-FileUpload'
      );
      const fileUploadStackSelector = buildNestedSelector(
        fileUploadSelector,
        '.Polaris-Stack'
      );
      const fileUploadStackItemSelector = buildNestedSelector(
        fileUploadStackSelector,
        '.Polaris-Stack__Item'
      );
      const fileUploadIconSelector = buildNestedSelector(
        fileUploadStackItemSelector,
        '.Polaris-Icon'
      );
      const fileUploadIconSVGSelector = buildNestedSelector(
        fileUploadIconSelector,
        'svg'
      );

      test('it renders properly with FileUpload', async function(assert) {
        assert.expect(8);

        this.set('style', htmlSafe(`width: ${smallWidth}px;`));
        await render(hbs`
          <div style={{style}}>
            {{#polaris-drop-zone type=type as |dropZone|}}
              {{dropZone.fileUpload}}
            {{/polaris-drop-zone}}
          </div>
        `);

        assert.dom(fileUploadSelector).exists('renders FileUpload component');
        assert
          .dom(fileUploadStackSelector)
          .exists('fileUpload wraps content in a stack');
        assert
          .dom(fileUploadStackSelector)
          .hasClass(
            'Polaris-Stack--vertical',
            'fileUpload stack is vertically aligned'
          );
        assert
          .dom(fileUploadStackSelector)
          .hasClass(
            'Polaris-Stack--spacingTight',
            'fileUpload stack has tight spacing'
          );
        assert
          .dom(fileUploadIconSelector)
          .exists('fileUpload icon is rendered');
        assert
          .dom(fileUploadIconSelector)
          .hasClass(
            'Polaris-Icon--colorInkLightest',
            'fileUpload icon has colorInkLightest class'
          );
        assert
          .dom(fileUploadIconSelector)
          .hasClass(
            'Polaris-Icon--isColored',
            'fileUpload icon has isColored class'
          );
        assert
          .dom(fileUploadIconSVGSelector)
          .hasAttribute(
            'data-icon-source',
            'polaris/drag-drop',
            'fileUpload icon SVG is `drag-drop`'
          );
      });

      test('renders properly during drag events', async function(assert) {
        assert.expect(4);

        let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

        this.set('style', htmlSafe(`width: ${smallWidth}px;`));
        await render(hbs`
          <div style={{style}}>
            {{#polaris-drop-zone accept=accept as |dropZone|}}
              {{dropZone.fileUpload}}
            {{/polaris-drop-zone}}
          </div>
        `);
        await triggerEvent(dropZoneSelector, 'dragenter', event);

        assert
          .dom(dropZoneOverlayTextSelector)
          .doesNotExist('dropzone overlay does not display text');
        assert
          .dom(dropZoneOverlayCaptionSelector)
          .doesNotExist('dropzone overlay does not display text');

        // Test that it shows error state
        this.set('accept', 'image/*');

        assert
          .dom(dropZoneOverlayTextSelector)
          .doesNotExist('dropzone error overlay does not display text');
        assert
          .dom(dropZoneOverlayCaptionSelector)
          .doesNotExist('dropzone error overlay does not display text');
      });
    });
  });

  /**
   * Event handling & callbacks
   */
  module('handles drag and drop events', function() {
    hooks.beforeEach(function() {
      this.owner.register('component:svg-jar', MockSvgJarComponent);
    });

    test('it calls onDrop callback when a drop event is fired', async function(assert) {
      assert.expect(6);

      this.set('drop', (files, acceptedFiles, rejectedFiles) => {
        assert.deepEqual(
          files,
          expectedFiles,
          'onDrop action receives correct `files`'
        );
        assert.deepEqual(
          acceptedFiles,
          expectedAcceptedFiles,
          'onDrop action receives correct `acceptedFiles`'
        );
        assert.deepEqual(
          rejectedFiles,
          expectedRejectedFiles,
          'onDrop action receives correct `rejectedFiles`'
        );
      });
      let expectedFiles = uploadedFiles;
      let expectedAcceptedFiles = uploadedFiles;
      let expectedRejectedFiles = [];

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-drop-zone onDrop=(action drop)}}`);
      await triggerEvent(dropZoneSelector, 'drop', event);

      // Test with `accept` being set
      expectedAcceptedFiles = uploadedFiles.slice(0, 2);
      expectedRejectedFiles = uploadedFiles.slice(2, 3);

      await render(
        hbs`{{polaris-drop-zone accept="image/*" onDrop=(action drop)}}`
      );
      await triggerEvent(dropZoneSelector, 'drop', event);
    });

    test('calls the onDrop callback when a drop event is fired on document twice when a duplicate file is added consecutively', async function(assert) {
      assert.expect(6);

      this.set('drop', (files, acceptedFiles, rejectedFiles) => {
        this.setProperties({ files, acceptedFiles, rejectedFiles });
      });

      await render(hbs`{{polaris-drop-zone onDrop=(action drop)}}`);

      let event1 = new MockEvent({ dataTransfer: { files: uploadedFiles } });
      await triggerEvent(dropZoneSelector, 'drop', event1);
      assert.deepEqual(this.get('files'), uploadedFiles);
      assert.deepEqual(this.get('acceptedFiles'), uploadedFiles);
      assert.deepEqual(this.get('rejectedFiles'), []);

      let event2 = new MockEvent({ dataTransfer: { files: duplicateFiles } });
      await triggerEvent(dropZoneSelector, 'drop', event2);
      assert.deepEqual(this.get('files'), duplicateFiles);
      assert.deepEqual(this.get('acceptedFiles'), duplicateFiles);
      assert.deepEqual(this.get('rejectedFiles'), []);
    });

    test('it calls onDrop callback when a drop event is fired on document', async function(assert) {
      assert.expect(9);

      this.set('drop', (files, acceptedFiles, rejectedFiles) => {
        assert.deepEqual(
          files,
          expectedFiles,
          'onDrop action receives correct `files`'
        );
        assert.deepEqual(
          acceptedFiles,
          expectedAcceptedFiles,
          'onDrop action receives correct `acceptedFiles`'
        );
        assert.deepEqual(
          rejectedFiles,
          expectedRejectedFiles,
          'onDrop action receives correct `rejectedFiles`'
        );
      });
      let expectedFiles = uploadedFiles;
      let expectedAcceptedFiles = uploadedFiles;
      let expectedRejectedFiles = [];

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      // Test that by default the document will not trigger callbacks
      await render(hbs`{{polaris-drop-zone onDrop=(action drop)}}`);
      await triggerEvent(document, 'drop', event);

      // Test that triggering callbacks on document when `dropOnPage` is true works
      await render(
        hbs`{{polaris-drop-zone dropOnPage=true onDrop=(action drop)}}`
      );
      await triggerEvent(document, 'drop', event);

      // Test that selecting files triggers onDrop
      await render(hbs`{{polaris-drop-zone onDrop=(action drop)}}`);
      selectFiles(inputSelector, uploadedFiles);

      // Test with `accept` being set
      expectedAcceptedFiles = uploadedFiles.slice(0, 2);
      expectedRejectedFiles = uploadedFiles.slice(2, 3);

      await render(
        hbs`{{polaris-drop-zone dropOnPage=true accept="image/*" onDrop=(action drop)}}`
      );
      await triggerEvent(document, 'drop', event);
    });

    test('calls the onDragEnter callback when a dragEnter event is fired', async function(assert) {
      assert.expect(1);

      this.set('dragEnter', () => {
        assert.ok('onDragEnter callback is invoked');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-drop-zone onDragEnter=(action dragEnter)}}`);
      await triggerEvent(dropZoneSelector, 'dragenter', event);
    });

    test('calls the onDragOver callback when a dragOver event is fired', async function(assert) {
      assert.expect(1);

      this.set('dragOver', () => {
        assert.ok('onDragOver callback is invoked');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-drop-zone onDragOver=(action dragOver)}}`);
      await triggerEvent(dropZoneSelector, 'dragover', event);
    });

    test('calls the onDragLeave callback when a dragLeave event is fired', async function(assert) {
      assert.expect(1);

      this.set('dragLeave', () => {
        assert.ok('onDragLeave callback is invoked');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-drop-zone onDragLeave=(action dragLeave)}}`);
      await triggerEvent(dropZoneSelector, 'dragleave', event);
    });

    test('it calls onDropAccepted callback correctly when it ony accepts images', async function(assert) {
      assert.expect(1);

      this.set('dropAccepted', (acceptedFiles) => {
        assert.deepEqual(
          acceptedFiles,
          uploadedFiles.slice(0, 2),
          'onDropAccepted action receives correct `acceptedFiles`'
        );
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(
        hbs`{{polaris-drop-zone accept="image/*" onDropAccepted=(action dropAccepted)}}`
      );
      await triggerEvent(dropZoneSelector, 'drop', event);
    });

    test('it calls onDropRejected callback correctly when it ony accepts images', async function(assert) {
      assert.expect(1);

      this.set('dropRejected', (rejectedFiles) => {
        assert.deepEqual(
          rejectedFiles,
          uploadedFiles.slice(2, 3),
          'onDropRejected action receives correct `rejectedFiles`'
        );
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(
        hbs`{{polaris-drop-zone accept="image/*" onDropRejected=(action dropRejected)}}`
      );
      await triggerEvent(dropZoneSelector, 'drop', event);
    });

    test('it calls onClick callback', async function(assert) {
      assert.expect(2);

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      // Test that `open` triggers click on the input element if `onClick` is not present
      await render(hbs`{{polaris-drop-zone}}`);

      this.element
        .querySelector(inputSelector)
        .addEventListener('click', () =>
          assert.ok('input element click triggered')
        );

      await triggerEvent(dropZoneSelector, 'click', event);

      // Test onClick is triggered
      this.set('clickAction', () => {
        assert.ok('onClick is invoked');
      });

      await render(hbs`{{polaris-drop-zone onClick=(action clickAction)}}`);
      await triggerEvent(dropZoneSelector, 'click', event);
    });

    test('should not call any callback when the dropzone is disabled', async function(assert) {
      assert.expect(0);

      for (let callback of [
        'drop',
        'dropAccepted',
        'dropRejected',
        'dragEnter',
        'dragLeave',
        'dragOver',
        'click',
      ]) {
        this.set(callback, () => {
          assert.ok(false, `on${capitalize(callback)} should not be invoked`);
        });
      }

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-drop-zone
        disabled=true
        onDrop=(action drop)
        onDropAccepted=(action dropAccepted)
        onDropRejected=(action dropRejected)
        onDragEnter=(action dragEnter)
        onDragLeave=(action dragLeave)
        onDragOver=(action dragOver)
        onClick=(action click)
      }}`);
      await triggerEvent(dropZoneSelector, 'dragenter', event);
      await triggerEvent(dropZoneSelector, 'dragover', event);
      await triggerEvent(dropZoneSelector, 'dragleave', event);
      await triggerEvent(dropZoneSelector, 'drop', event);
      await triggerEvent(dropZoneSelector, 'click', event);
    });

    test('does not call callbacks when not allowed multiple and a file is uploaded', async function(assert) {
      let expectedAcceptedFiles = uploadedFiles.slice(0, 1);
      let expectedRejectedFiles = uploadedFiles.slice(1, 3);

      this.set('onFileDropped', (files, acceptedFiles, rejectedFiles) => {
        this.setProperties({
          files,
          acceptedFiles,
          rejectedFiles,
        });
      });

      await render(hbs`
        {{polaris-drop-zone
          allowMultiple=false
          onDrop=(action
            (if hasDroppedFile
              (action (mut wasCallbackInvoked) true)
              (action onFileDropped)
            )
          )
          onDragEnter=(action (mut wasCallbackInvoked) true)
          onDragLeave=(action (mut wasCallbackInvoked) true)
          onDragOver=(action (mut wasCallbackInvoked) true)
          accept="image/jpeg"
        }}
      `);

      // Initial event to populate zone with data (should succeed)
      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });
      await triggerEvent(dropZoneSelector, 'drop', event);
      assert.deepEqual(this.get('files'), uploadedFiles);
      assert.deepEqual(this.get('acceptedFiles'), expectedAcceptedFiles);
      assert.deepEqual(this.get('rejectedFiles'), expectedRejectedFiles);

      // All events should now be ignored
      await triggerEvent(dropZoneSelector, 'drop', event);
      assert.notOk(this.get('wasCallbackInvoked'));
      await triggerEvent(dropZoneSelector, 'dragenter', event);
      assert.notOk(this.get('wasCallbackInvoked'));
      await triggerEvent(dropZoneSelector, 'dragleave', event);
      assert.notOk(this.get('wasCallbackInvoked'));
      await triggerEvent(dropZoneSelector, 'dragover', event);
      assert.notOk(this.get('wasCallbackInvoked'));
    });

    test('it supports `customValidator` property', async function(assert) {
      assert.expect(3);

      this.set('customValidator', (file) => file.type === 'image/jpeg');
      this.set('drop', (files, acceptedFiles, rejectedFiles) => {
        assert.deepEqual(
          files,
          uploadedFiles,
          'drop action receives correct `files`'
        );
        assert.deepEqual(
          acceptedFiles,
          uploadedFiles.slice(0, 1),
          'drop action receives correct `acceptedFiles`'
        );
        assert.deepEqual(
          rejectedFiles,
          uploadedFiles.slice(1, 3),
          'drop action receives correct `rejectedFiles`'
        );
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(
        hbs`{{polaris-drop-zone customValidator=(action customValidator) onDrop=(action drop)}}`
      );
      await triggerEvent(dropZoneSelector, 'drop', event);
    });

    test('it supports `allowMultiple` property', async function(assert) {
      assert.expect(4);

      this.set('drop', (files, acceptedFiles, rejectedFiles) => {
        assert.deepEqual(
          files,
          uploadedFiles,
          'drop action receives correct `files`'
        );
        assert.deepEqual(
          acceptedFiles,
          uploadedFiles.slice(0, 1),
          'drop action receives correct `acceptedFiles`'
        );
        assert.deepEqual(
          rejectedFiles,
          [],
          'drop action receives correct `rejectedFiles`'
        );
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(
        hbs`{{polaris-drop-zone allowMultiple=false onDrop=(action drop)}}`
      );
      await triggerEvent(dropZoneSelector, 'drop', event);

      assert
        .dom(inputSelector)
        .doesNotHaveAttribute(
          'multiple',
          'when `allowMultiple` is false, input element does not have `multiple` attribute'
        );
    });

    test('it supports custom dialog trigger', async function(assert) {
      this.set('openFileDialog', false);

      await render(hbs`
        {{polaris-button text="Upload file" onClick=(action (mut openFileDialog) true)}}
        {{polaris-drop-zone openFileDialog=openFileDialog onFileDialogClose=(action (mut openFileDialog) false)}}
      `);

      await triggerEvent('.Polaris-Button', 'click', event);

      assert.notOk(this.get('openFileDialog'));
    });

    test('it supports passing `label` attributes', async function(assert) {
      let actionFired = false;

      this.setProperties({
        actionFired,
        labelAction: () => {
          this.set('actionFired', true);
        },
      });

      await render(hbs`
        {{polaris-drop-zone
          label="my label"
          labelAction=(hash
            text="my label action"
            onAction=(action labelAction)
          )
        }}
      `);

      assert
        .dom(dropZoneLabelWrapperSelector)
        .exists('A labelled component is wrapped around the dropzone');

      await triggerEvent(dropZoneLabelButtonSelector, 'click');

      assert.ok(this.get('actionFired'), 'Label action fired');
    });
  });

  module('overlayText', function() {
    const overlayText = 'overlay text';

    test('does not render the overlayText on small screens', async function(assert) {
      this.set('overlayText', overlayText);
      setBoundingClientRect('small');

      await render(hbs`
        {{polaris-drop-zone overlayText=overlayText}}
      `);

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });
      await triggerEvent(dropZoneSelector, 'dragenter', event);

      assert.dom('[data-test-display-text]').doesNotExist();
      assert.dom('[data-test-caption]').doesNotExist();
    });

    test('renders a Caption containing the overlayText on medium screens', async function(assert) {
      this.set('overlayText', overlayText);
      setBoundingClientRect('medium');

      await render(hbs`
        {{polaris-drop-zone overlayText=overlayText}}
      `);

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });
      await triggerEvent(dropZoneSelector, 'dragenter', event);

      assert.dom('[data-test-caption]').hasText(overlayText);
    });

    test('renders a Caption containing the overlayText on large screens', async function(assert) {
      this.set('overlayText', overlayText);
      setBoundingClientRect('large');

      await render(hbs`
        {{polaris-drop-zone overlayText=overlayText}}
      `);

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });
      await triggerEvent(dropZoneSelector, 'dragenter', event);

      assert.dom('[data-test-caption]').hasText(overlayText);
    });

    test('renders a DisplayText containing the overlayText on extra-large screens', async function(assert) {
      this.set('overlayText', overlayText);
      setBoundingClientRect('extraLarge');

      await render(hbs`
        {{polaris-drop-zone overlayText=overlayText}}
      `);

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });
      await triggerEvent(dropZoneSelector, 'dragenter', event);

      assert.dom('[data-test-display-text]').hasText(overlayText);
    });
  });
});

function setBoundingClientRect(size) {
  Element.prototype.getBoundingClientRect = () => {
    return {
      width: widths[size],
      height: 100,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    };
  };
}
