import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent, settled } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { capitalize, htmlSafe } from '@ember/string';
import { selectFiles } from 'ember-native-dom-helpers';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';
import MockEvent from '@smile-io/ember-polaris/test-support/mock-dropzone-event';

module('Integration | Component | polaris-dropzone', function(hooks) {
  setupRenderingTest(hooks);

  const uploadedFiles = [{
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
  }];

  const dropzoneSelector = '.Polaris-DropZone';
  const containerSelector = buildNestedSelector(dropzoneSelector, '.Polaris-DropZone__Container');
  // Hidden dropzone input element
  const inputSelector = buildNestedSelector(
    dropzoneSelector,
    '.Polaris-VisuallyHidden',
    'input'
  );

  // Overlays
  const dropzoneOverlaySelector = buildNestedSelector(dropzoneSelector, '.Polaris-DropZone__Overlay');
  const dropzoneOverlayStackSelector = buildNestedSelector(dropzoneOverlaySelector, '.Polaris-Stack');
  const dropzoneOverlayStackItemSelector = buildNestedSelector(dropzoneOverlayStackSelector, '.Polaris-Stack__Item');
  const dropzoneOverlayIconSelector = buildNestedSelector(dropzoneOverlayStackItemSelector, '.Polaris-Icon');
  const dropzoneOverlayIconSVGSelector = buildNestedSelector(dropzoneOverlayIconSelector, 'svg');
  const dropzoneOverlayTextSelector = buildNestedSelector(dropzoneOverlayStackItemSelector, '.Polaris-DisplayText');
  const dropzoneOverlayCaptionSelector = buildNestedSelector(dropzoneOverlayStackItemSelector, '.Polaris-Caption');

  test('it renders in inline form', async function(assert) {
    assert.expect(8);

    await render(hbs`{{polaris-dropzone}}`);

    // Defaults
    assert.dom(dropzoneSelector).exists('has Polaris-DropZone class');
    assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--hasOutline', 'has outline class');
    assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--sizeLarge', 'has large size class');

    assert.dom(containerSelector).exists('has the DropZone container element');

    assert.dom(inputSelector).exists('has the input element hidden');
    assert.dom(inputSelector).hasAttribute('autocomplete', 'off', 'input element has attribute autocomplete `off`');
    assert.dom(inputSelector).hasAttribute('multiple', '', 'input element has attribute multiple');
    assert.dom(inputSelector).hasAttribute('type', 'file', 'input element has attribute type `file`');
  });

  test('it supports `outline` property', async function(assert) {
    assert.expect(2);

    this.set('outline', true);

    await render(hbs`{{polaris-dropzone outline=outline}}`);

    assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--hasOutline', 'has outline class');

    this.set('outline', false);
    assert.dom(dropzoneSelector).doesNotHaveClass('Polaris-DropZone--hasOutline', 'if `outline` is false, it does not have  outline class');
  });

  test('it supports `disabled` property', async function(assert) {
    assert.expect(4);

    await render(hbs`{{polaris-dropzone disabled=disabled}}`);

    assert.dom(dropzoneSelector).doesNotHaveAttribute('aria-disabled', 'if `disabled` is not provided, dropzone does not have `aria-label` attribute')
    assert.dom(inputSelector).isNotDisabled('if `disabled` is not provided, input does not have `disabled` attribute');

    this.set('disabled', true);
    assert.dom(dropzoneSelector).hasAttribute('aria-disabled', 'true', '`aria-disabled` attribute set, if `disabled` is true');
    assert.dom(inputSelector).isDisabled('if `disabled` is true, input is disabled');
  });

  test('it supports `accept` property', async function(assert) {
    assert.expect(2);

    await render(hbs`{{polaris-dropzone accept=accept}}`);

    assert.dom(inputSelector).doesNotHaveAttribute('accept', 'if `accept` is not provided, input does not have `accept` attribute');

    this.set('accept', 'image/*');
    assert.dom(inputSelector).hasAttribute('accept', 'image/*', '`accept` attribute properly set');
  });

  test('it supports `error` && `errorOverlayText` properties', async function(assert) {
    assert.expect(3);

    let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });
    await render(hbs`{{polaris-dropzone error=error errorOverlayText=errorOverlayText}}`);
    await triggerEvent(dropzoneSelector, 'dragenter', event);

    assert.dom(dropzoneSelector).doesNotHaveClass('Polaris-DropZone--hasError', 'if `error` is not provided, dropzone does not have error class');

    this.setProperties({
      error: true,
      errorOverlayText: "Something went haywire!"
    });
    assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--hasError', 'if `error` is true, dropzone has error class');
    assert.dom(dropzoneOverlayTextSelector).hasText('Something went haywire!', 'dropzone error overlay has proper text');
  });

  test('it supports `overlayText` property', async function(assert) {
    assert.expect(2);

    this.set('overlay', true);
    let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });
    await render(hbs`{{polaris-dropzone overlay=overlay overlayText=overlayText}}`);
    await triggerEvent(dropzoneSelector, 'dragenter', event);

    this.set('overlayText', 'Something draggin here!');
    assert.dom(dropzoneOverlayTextSelector).hasText('Something draggin here!', 'dropzone overlay has proper text');

    this.set('overlay', false);
    assert.dom(dropzoneOverlayTextSelector).doesNotExist('dropzone overlay is not rendered when overlay is false');
  });

  test('it handles sizing property based on the parent element', async function(assert) {
    await render(hbs`
      <div style={{style}}>
        {{polaris-dropzone size=size}}
      </div>
    `);

    assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--sizeLarge', 'has large class');

    this.set('style', htmlSafe('width: 299px;'));
    await triggerEvent(window, 'resize');
    await settled();

    assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--sizeMedium', 'has medium class');

    this.set('style', htmlSafe('width: 110px;'));
    await triggerEvent(window, 'resize');
    await settled();

    assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--sizeSmall', 'has small class');
  });

  module('rendering', function() {
    test('renders properly during drag events', async function(assert) {
      assert.expect(28);

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone accept=accept}}`);
      await triggerEvent(dropzoneSelector, 'dragenter', event);

      assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--isDragging', 'has isDragging class when dragging');
      assert.dom(dropzoneSelector).doesNotHaveClass('Polaris-DropZone--hasError', 'does not have hasError class when dragging and no rejected files');
      assert.dom(dropzoneOverlayStackSelector).exists('dropzone overlay wraps content in a stack');
      assert.dom(dropzoneOverlayStackSelector).hasClass('Polaris-Stack--vertical', 'dropzone overlay stack is vertically aligned');
      assert.dom(dropzoneOverlayStackSelector).hasClass('Polaris-Stack--spacingTight', 'dropzone overlay stack has tight spacing');
      assert.dom(dropzoneOverlayIconSelector).hasClass('Polaris-Icon--colorIndigo', 'dropzone overlay icon has colorIndigo class');
      assert.dom(dropzoneOverlayIconSelector).hasClass('Polaris-Icon--isColored', 'dropzone overlay icon has isColored class');
      assert.dom(dropzoneOverlayIconSVGSelector).hasAttribute('data-icon-source', 'polaris/drag-drop', 'dropzone overlay icon SVG is `drag-drop`');
      assert.dom(dropzoneOverlayTextSelector).hasClass('Polaris-DisplayText--sizeSmall', 'dropzone overlay text has sizeSmall class');
      assert.dom(dropzoneOverlayTextSelector).hasText('Drop file to upload', 'dropzone overlay has proper text');
      assert.dom(dropzoneOverlayCaptionSelector).doesNotExist('dropzone overlay does not have caption text');

      await triggerEvent(dropzoneSelector, 'dragleave', event);

      assert.dom(dropzoneSelector).doesNotHaveClass('Polaris-DropZone--isDragging', 'does not have isDragging class when dragging');
      assert.dom(dropzoneOverlaySelector).doesNotExist('once no longer dragging, overlay not shown');
      assert.dom(dropzoneSelector).doesNotHaveClass('Polaris-DropZone--isDragging', 'does not have isDragging class when dragging done');

      // Test that it shows error state
      this.set('accept', 'image/*');

      await triggerEvent(dropzoneSelector, 'dragenter', event);

      assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--isDragging', 'has isDragging class when dragging');
      assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--hasError', 'has hasError class when dragging and there are rejected files');
      assert.dom(dropzoneOverlayStackSelector).exists('dropzone error overlay wraps content in a stack');
      assert.dom(dropzoneOverlayStackSelector).hasClass('Polaris-Stack--vertical', 'dropzone error overlay stack is vertically aligned');
      assert.dom(dropzoneOverlayStackSelector).hasClass('Polaris-Stack--spacingTight', 'dropzone error overlay stack has tight spacing');
      assert.dom(dropzoneOverlayIconSelector).hasClass('Polaris-Icon--colorRed', 'dropzone error overlay icon has colorRed class');
      assert.dom(dropzoneOverlayIconSelector).hasClass('Polaris-Icon--isColored', 'dropzone error overlay icon has isColored class');
      assert.dom(dropzoneOverlayIconSVGSelector).hasAttribute('data-icon-source', 'polaris/alert-circle', 'dropzone error overlay icon SVG is `alert-circle`');
      assert.dom(dropzoneOverlayTextSelector).hasClass('Polaris-DisplayText--sizeSmall', 'dropzone error overlay text has sizeSmall class');
      assert.dom(dropzoneOverlayTextSelector).hasText('File type is not valid', 'dropzone error overlay has proper text');
      assert.dom(dropzoneOverlayCaptionSelector).doesNotExist('dropzone error overlay does not have caption text');

      await triggerEvent(dropzoneSelector, 'dragleave', event);

      assert.dom(dropzoneSelector).doesNotHaveClass('Polaris-DropZone--isDragging', 'does not have isDragging class when dragging is done');
      assert.dom(dropzoneSelector).doesNotHaveClass('Polaris-DropZone--hasError', 'does not have hasError class when dragging is done');
      assert.dom(dropzoneOverlaySelector).doesNotExist('once no longer dragging, overlay not shown');
    });

    /**
     * Testing dropzone when the `size` is `large`
     */
    module('when size is large', function() {
      const fileUploadSelector = buildNestedSelector(containerSelector, '.Polaris-DropZone-FileUpload');
      const fileUploadStackSelector = buildNestedSelector(fileUploadSelector, '.Polaris-Stack');
      const fileUploadStackItemSelector = buildNestedSelector(fileUploadStackSelector, '.Polaris-Stack__Item');
      const fileUploadImageSelector = buildNestedSelector(fileUploadStackItemSelector, '.Polaris-DropZone-FileUpload__Image');
      const fileUploadButtonTextSelector = buildNestedSelector(
        fileUploadStackItemSelector,
        'button.Polaris-Button',
        '.Polaris-Button__Content',
        'span'
      );
      const fileUploadTextSelector = buildNestedSelector(fileUploadStackItemSelector, '.Polaris-TextStyle--variationSubdued');

      test('it renders properly with FileUpload', async function(assert) {
        assert.expect(11);

        await render(hbs`
          {{#polaris-dropzone type=type as |dropzone|}}
            {{dropzone.fileUpload}}
          {{/polaris-dropzone}}
        `);

        assert.dom(fileUploadSelector).exists('renders FileUpload component');
        assert.dom(fileUploadStackSelector).exists('fileUpload wraps content in a stack');
        assert.dom(fileUploadStackSelector).hasClass('Polaris-Stack--vertical', 'fileUpload stack is vertically aligned');
        assert.dom(fileUploadImageSelector).exists('fileUpload image is rendered');
        assert.dom(fileUploadImageSelector).hasAttribute('src', '/ember-polaris/images/file-upload.svg', 'fileUpload has correct image `src` attribute');
        assert.dom(fileUploadImageSelector).hasAttribute('alt', '', 'fileUpload has correct image `alt` attribute');
        assert.dom(fileUploadButtonTextSelector).hasText('Add file', 'fileUpload button has correct text');
        assert.dom(fileUploadTextSelector).hasText('or drop files to upload', 'fileUpload has correct text');

        this.set('type', 'image');

        assert.dom(fileUploadImageSelector).hasAttribute('src', '/ember-polaris/images/image-upload.svg', 'fileUpload has correct image `src` attribute when image-type dropzone');
        assert.dom(fileUploadButtonTextSelector).hasText('Add image', 'fileUpload button has correct text when image-type dropzone');
        assert.dom(fileUploadTextSelector).hasText('or drop images to upload', 'fileUpload has correct text when image-type dropzone');
      });
    });

    module('when size is medium', function() {
      const fileUploadSelector = buildNestedSelector(containerSelector, '.Polaris-DropZone-FileUpload');
      const fileUploadStackSelector = buildNestedSelector(fileUploadSelector, '.Polaris-Stack');
      const fileUploadStackItemSelector = buildNestedSelector(fileUploadStackSelector, '.Polaris-Stack__Item');
      const fileUploadLinkSelector = buildNestedSelector(fileUploadStackItemSelector, 'button.Polaris-Link');
      const fileUploadCaptionSelector = buildNestedSelector(fileUploadStackItemSelector, '.Polaris-Caption', );

      test('it renders properly with FileUpload', async function(assert) {
        assert.expect(8);

        await render(hbs`
          <div style="width: 299px;">
            {{#polaris-dropzone type=type as |dropzone|}}
              {{dropzone.fileUpload}}
            {{/polaris-dropzone}}
          </div>
        `);

        assert.dom(fileUploadSelector).exists('renders FileUpload component');
        assert.dom(fileUploadStackSelector).exists('fileUpload wraps content in a stack');
        assert.dom(fileUploadStackSelector).hasClass('Polaris-Stack--vertical', 'fileUpload stack is vertically aligned');
        assert.dom(fileUploadStackSelector).hasClass('Polaris-Stack--spacingTight', 'fileUpload stack has tight spacing');
        assert.dom(fileUploadLinkSelector).hasText('Add file', 'fileUpload link has correct text');
        assert.dom(fileUploadCaptionSelector).hasText('or drop files to upload', 'fileUpload caption has correct text');

        this.set('type', 'image');

        assert.dom(fileUploadLinkSelector).hasText('Add image', 'fileUpload link has correct text when image-type dropzone');
        assert.dom(fileUploadCaptionSelector).hasText('or drop images to upload', 'fileUpload has correct text when image-type dropzone');
      });

      test('renders properly during drag events', async function(assert) {
        assert.expect(4);

        let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

        await render(hbs`
          <div style="width: 299px;">
            {{#polaris-dropzone accept=accept as |dropzone|}}
              {{dropzone.fileUpload}}
            {{/polaris-dropzone}}
          </div>
        `);
        await triggerEvent(dropzoneSelector, 'dragenter', event);

        assert.dom(dropzoneOverlayTextSelector).doesNotExist('dropzone overlay does not have display text');
        assert.dom(dropzoneOverlayCaptionSelector).hasText('Drop file to upload', 'dropzone overlay caption has proper text');

        // Test that it shows error state
        this.set('accept', 'image/*');

        assert.dom(dropzoneOverlayTextSelector).doesNotExist('dropzone error overlay does not have display text');
        assert.dom(dropzoneOverlayCaptionSelector).hasText('Drop file to upload', 'dropzone error overlay caption has proper text');
      });
    });

    module('when size is small', function(hooks) {
      hooks.beforeEach(function() {
        this.owner.register('component:svg-jar', MockSvgJarComponent);
      });

      const fileUploadSelector = buildNestedSelector(containerSelector, '.Polaris-DropZone-FileUpload');
      const fileUploadStackSelector = buildNestedSelector(fileUploadSelector, '.Polaris-Stack');
      const fileUploadStackItemSelector = buildNestedSelector(fileUploadStackSelector, '.Polaris-Stack__Item');
      const fileUploadIconSelector = buildNestedSelector(fileUploadStackItemSelector, '.Polaris-Icon');
      const fileUploadIconSVGSelector = buildNestedSelector(fileUploadIconSelector, 'svg');

      test('it renders properly with FileUpload', async function(assert) {
        assert.expect(8);

        await render(hbs`
          <div style="width: 113px;">
            {{#polaris-dropzone type=type as |dropzone|}}
              {{dropzone.fileUpload}}
            {{/polaris-dropzone}}
          </div>
        `);

        assert.dom(fileUploadSelector).exists('renders FileUpload component');
        assert.dom(fileUploadStackSelector).exists('fileUpload wraps content in a stack');
        assert.dom(fileUploadStackSelector).hasClass('Polaris-Stack--vertical', 'fileUpload stack is vertically aligned');
        assert.dom(fileUploadStackSelector).hasClass('Polaris-Stack--spacingTight', 'fileUpload stack has tight spacing');
        assert.dom(fileUploadIconSelector).exists('fileUpload icon is rendered');
        assert.dom(fileUploadIconSelector).hasClass('Polaris-Icon--colorInkLightest', 'fileUpload icon has colorInkLightest class');
        assert.dom(fileUploadIconSelector).hasClass('Polaris-Icon--isColored', 'fileUpload icon has isColored class');
        assert.dom(fileUploadIconSVGSelector).hasAttribute('data-icon-source', 'polaris/drag-drop', 'fileUpload icon SVG is `drag-drop`');
      });

      test('renders properly during drag events', async function(assert) {
        assert.expect(4);

        let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

        await render(hbs`
          <div style="width: 113px;">
            {{#polaris-dropzone accept=accept as |dropzone|}}
              {{dropzone.fileUpload}}
            {{/polaris-dropzone}}
          </div>
        `);
        await triggerEvent(dropzoneSelector, 'dragenter', event);

        assert.dom(dropzoneOverlayTextSelector).doesNotExist('dropzone overlay does not display text');
        assert.dom(dropzoneOverlayCaptionSelector).doesNotExist('dropzone overlay does not display text');

        // Test that it shows error state
        this.set('accept', 'image/*');

        assert.dom(dropzoneOverlayTextSelector).doesNotExist('dropzone error overlay does not display text');
        assert.dom(dropzoneOverlayCaptionSelector).doesNotExist('dropzone error overlay does not display text');
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
        assert.deepEqual(files, expectedFiles, 'onDrop action receives correct `files`');
        assert.deepEqual(acceptedFiles, expectedAcceptedFiles, 'onDrop action receives correct `acceptedFiles`');
        assert.deepEqual(rejectedFiles, expectedRejectedFiles, 'onDrop action receives correct `rejectedFiles`');
      });
      let expectedFiles = uploadedFiles;
      let expectedAcceptedFiles = uploadedFiles;
      let expectedRejectedFiles = [];

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone onDrop=(action drop)}}`);
      await triggerEvent(dropzoneSelector, 'drop', event);

      // Test with `accept` being set
      expectedAcceptedFiles = uploadedFiles.slice(0, 2);
      expectedRejectedFiles = uploadedFiles.slice(2, 3);

      await render(hbs`{{polaris-dropzone accept="image/*" onDrop=(action drop)}}`);
      await triggerEvent(dropzoneSelector, 'drop', event);
    });

    test('it calls onDrop callback when a drop event is fired on document', async function(assert) {
      assert.expect(9);

      this.set('drop', (files, acceptedFiles, rejectedFiles) => {
        assert.deepEqual(files, expectedFiles, 'onDrop action receives correct `files`');
        assert.deepEqual(acceptedFiles, expectedAcceptedFiles, 'onDrop action receives correct `acceptedFiles`');
        assert.deepEqual(rejectedFiles, expectedRejectedFiles, 'onDrop action receives correct `rejectedFiles`');
      });
      let expectedFiles = uploadedFiles;
      let expectedAcceptedFiles = uploadedFiles;
      let expectedRejectedFiles = [];

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      // Test that by default the document will not trigger callbacks
      await render(hbs`{{polaris-dropzone onDrop=(action drop)}}`);
      await triggerEvent(document, 'drop', event);

      // Test that triggering callbacks on document when `dropOnPage` is true works
      await render(hbs`{{polaris-dropzone dropOnPage=true onDrop=(action drop)}}`);
      await triggerEvent(document, 'drop', event);

      // Test that selecting files triggers onDrop
      await render(hbs`{{polaris-dropzone onDrop=(action drop)}}`);
      selectFiles(inputSelector, uploadedFiles);

      // Test with `accept` being set
      expectedAcceptedFiles = uploadedFiles.slice(0, 2);
      expectedRejectedFiles = uploadedFiles.slice(2, 3);

      await render(hbs`{{polaris-dropzone dropOnPage=true accept="image/*" onDrop=(action drop)}}`);
      await triggerEvent(document, 'drop', event);
    });

    test('calls the onDragEnter callback when a dragEnter event is fired', async function(assert) {
      assert.expect(1);

      this.set('dragEnter', () => {
        assert.ok('onDragEnter callback is invoked');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone onDragEnter=(action dragEnter)}}`);
      await triggerEvent(dropzoneSelector, 'dragenter', event);
    });

    test('calls the onDragOver callback when a dragOver event is fired', async function(assert) {
      assert.expect(1);

      this.set('dragOver', () => {
        assert.ok('onDragOver callback is invoked');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone onDragOver=(action dragOver)}}`);
      await triggerEvent(dropzoneSelector, 'dragover', event);
    });

    test('calls the onDragLeave callback when a dragLeave event is fired', async function(assert) {
      assert.expect(1);

      this.set('dragLeave', () => {
        assert.ok('onDragLeave callback is invoked');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone onDragLeave=(action dragLeave)}}`);
      await triggerEvent(dropzoneSelector, 'dragleave', event);
    });

    test('it calls onDropAccepted callback correctly when it ony accepts images', async function(assert) {
      assert.expect(1);

      this.set('dropAccepted', (acceptedFiles) => {
        assert.deepEqual(acceptedFiles, uploadedFiles.slice(0, 2), 'onDropAccepted action receives correct `acceptedFiles`');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone accept="image/*" onDropAccepted=(action dropAccepted)}}`);
      await triggerEvent(dropzoneSelector, 'drop', event);
    });

    test('it calls onDropRejected callback correctly when it ony accepts images', async function(assert) {
      assert.expect(1);

      this.set('dropRejected', (rejectedFiles) => {
        assert.deepEqual(rejectedFiles, uploadedFiles.slice(2, 3), 'onDropRejected action receives correct `rejectedFiles`');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone accept="image/*" onDropRejected=(action dropRejected)}}`);
      await triggerEvent(dropzoneSelector, 'drop', event);
    });

    test('it calls onClick callback', async function(assert) {
      assert.expect(2);

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      // Test that `open` triggers click on the input element if `onClick` is not present
      await render(hbs`{{polaris-dropzone}}`);

      this.element.querySelector(inputSelector).addEventListener('click', () => assert.ok('input element click triggered'));

      await triggerEvent(dropzoneSelector, 'click', event);

      // Test onClick is triggered
      this.set('clickAction', () => {
        assert.ok('onClick is invoked');
      });

      await render(hbs`{{polaris-dropzone onClick=(action clickAction)}}`);
      await triggerEvent(dropzoneSelector, 'click', event);
    });

    test('should not call any callback when the dropzone is disabled', async function(assert) {
      assert.expect(0);

      for (let callback of ['drop', 'dropAccepted', 'dropRejected', 'dragEnter', 'dragLeave', 'dragOver', 'click']) {
        this.set(callback, () => {
          assert.ok(false, `on${ capitalize(callback) } should not be invoked`);
        });
      }

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone
        disabled=true
        onDrop=(action drop)
        onDropAccepted=(action dropAccepted)
        onDropRejected=(action dropRejected)
        onDragEnter=(action dragEnter)
        onDragLeave=(action dragLeave)
        onDragOver=(action dragOver)
        onClick=(action click)
      }}`);
      await triggerEvent(dropzoneSelector, 'dragenter', event);
      await triggerEvent(dropzoneSelector, 'dragover', event);
      await triggerEvent(dropzoneSelector, 'dragleave', event);
      await triggerEvent(dropzoneSelector, 'drop', event);
      await triggerEvent(dropzoneSelector, 'click', event);
    });

    test('it supports `customValidator` property', async function(assert) {
      assert.expect(3);

      this.set('customValidator', (file) => file.type === 'image/jpeg');
      this.set('drop', (files, acceptedFiles, rejectedFiles) => {
        assert.deepEqual(files, uploadedFiles, 'drop action receives correct `files`');
        assert.deepEqual(acceptedFiles, uploadedFiles.slice(0, 1), 'drop action receives correct `acceptedFiles`');
        assert.deepEqual(rejectedFiles, uploadedFiles.slice(1, 3), 'drop action receives correct `rejectedFiles`');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone customValidator=(action customValidator) onDrop=(action drop)}}`);
      await triggerEvent(dropzoneSelector, 'drop', event);
    });


    test('it supports `allowMultiple` property', async function(assert) {
      assert.expect(4);

      this.set('drop', (files, acceptedFiles, rejectedFiles) => {
        assert.deepEqual(files, uploadedFiles, 'drop action receives correct `files`');
        assert.deepEqual(acceptedFiles, uploadedFiles.slice(0, 1), 'drop action receives correct `acceptedFiles`');
        assert.deepEqual(rejectedFiles, [], 'drop action receives correct `rejectedFiles`');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone allowMultiple=false onDrop=(action drop)}}`);
      await triggerEvent(dropzoneSelector, 'drop', event);

      assert.dom(inputSelector).doesNotHaveAttribute('multiple', 'when `allowMultiple` is false, input element does not have `multiple` attribute');
    });

    test('it supports custom dialog trigger', async function(assert) {
      this.set('openFileDialog', false);

      await render(hbs`
        {{polaris-button text="Upload file" onClick=(action (mut openFileDialog) true)}}
        {{polaris-dropzone openFileDialog=openFileDialog onFileDialogClose=(action (mut openFileDialog) false)}}
      `);

      await triggerEvent('.Polaris-Button', 'click', event);

      assert.notOk(this.get('openFileDialog'));
    });
  });
});
