import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { capitalize } from '@ember/string';
import buildNestedSelector from '../../helpers/build-nested-selector';
import MockSvgJarComponent from '../../mocks/components/svg-jar';
import MockEvent from 'ember-polaris/test-support/mock-dropzone-event';

module('Integration | Component | polaris-dropzone', function(hooks) {
  setupRenderingTest(hooks);

  const dropzoneSelector = '.Polaris-DropZone';
  const containerSelector = buildNestedSelector(dropzoneSelector, '.Polaris-DropZone__Container');
  // Hidden dropzone input element
  const inputSelector = buildNestedSelector(
    dropzoneSelector,
    '.Polaris-VisuallyHidden',
    'input'
  );

  test('it renders in non-block form', async function(assert) {
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
    this.set('outline', true);

    await render(hbs`{{polaris-dropzone outline=outline}}`);

    assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--hasOutline', 'has outline class');

    this.set('outline', false);
    assert.dom(dropzoneSelector).doesNotHaveClass('Polaris-DropZone--hasOutline', 'if `outline` is false, it does not have  outline class');
  });

  test('it supports `disabled` property', async function(assert) {
    await render(hbs`{{polaris-dropzone disabled=disabled}}`);

    assert.dom(dropzoneSelector).doesNotHaveAttribute('aria-disabled', 'if `disabled` is not provided, dropzone does not have `aria-label` attribute')
    assert.dom(inputSelector).isNotDisabled('if `disabled` is not provided, input does not have `disabled` attribute');

    this.set('disabled', true);
    assert.dom(dropzoneSelector).hasAttribute('aria-disabled', 'true', '`aria-disabled` attribute set, if `disabled` is true');
    assert.dom(inputSelector).isDisabled('if `disabled` is true, input is disabled');
  });

  test('it supports `accept` property', async function(assert) {
    await render(hbs`{{polaris-dropzone accept=accept}}`);

    assert.dom('.Polaris-VisuallyHidden > input').doesNotHaveAttribute('accept', 'if `accept` is not provided, input does not have `accept` attribute');

    this.set('accept', 'image/*');
    assert.dom(inputSelector).hasAttribute('accept', 'image/*', '`accept` attribute properly set');
  });

  /**
   * Testing dropzone when the `size` is `large`
   */
  module('when size is large', function() {
    const fileUploadSelector = buildNestedSelector(containerSelector, '.Polaris-DropZone-FileUpload');
    const fileUploadStackSelector = buildNestedSelector(fileUploadSelector, '.Polaris-Stack.Polaris-Stack--vertical');
    const fileUploadStackItemSelector = buildNestedSelector(fileUploadStackSelector, '.Polaris-Stack__Item');
    const fileUploadImageSelector = buildNestedSelector(fileUploadStackItemSelector, '.Polaris-DropZone-FileUpload__Image');
    const fileUploadButtonTextSelector = buildNestedSelector(
      fileUploadStackItemSelector,
      'button.Polaris-Button',
      '.Polaris-Button__Content',
      'span'
    );
    const fileUploadTextSelector = buildNestedSelector(fileUploadStackItemSelector, '.Polaris-TextStyle--variationSubdued');

    test('it renders properly', async function(assert) {
      await render(hbs`
        {{#polaris-dropzone type=type as |dropzone|}}
          {{dropzone.fileUpload}}
        {{/polaris-dropzone}}
      `);

      assert.dom(fileUploadSelector).exists('renders FileUpload component');
      assert.dom(fileUploadStackSelector).exists('fileUpload wraps content in a stack');
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
    const fileUploadStackSelector = buildNestedSelector(fileUploadSelector, '.Polaris-Stack.Polaris-Stack--vertical');
    const fileUploadStackItemSelector = buildNestedSelector(fileUploadStackSelector, '.Polaris-Stack__Item');
    const fileUploadLinkSelector = buildNestedSelector(fileUploadStackItemSelector, 'button.Polaris-Link');
    const fileUploadCaptionSelector = buildNestedSelector(fileUploadStackItemSelector, '.Polaris-Caption', );

    test('it renders properly', async function(assert) {
      await render(hbs`
        <div style="width: 299px;">
          {{#polaris-dropzone type=type as |dropzone|}}
            {{dropzone.fileUpload}}
          {{/polaris-dropzone}}
        </div>
      `);

      assert.dom(fileUploadSelector).exists('renders FileUpload component');
      assert.dom(fileUploadStackSelector).exists('fileUpload wraps content in a stack');
      assert.dom(fileUploadStackSelector).hasClass('Polaris-Stack--spacingTight', 'fileUpload wrapping stack is tight');
      assert.dom(fileUploadLinkSelector).hasText('Add file', 'fileUpload link has correct text');
      assert.dom(fileUploadCaptionSelector).hasText('or drop files to upload', 'fileUpload caption has correct text');

      this.set('type', 'image');

      assert.dom(fileUploadLinkSelector).hasText('Add image', 'fileUpload link has correct text when image-type dropzone');
      assert.dom(fileUploadCaptionSelector).hasText('or drop images to upload', 'fileUpload has correct text when image-type dropzone');
    });
  });

  module('when size is small', function(hooks) {
    hooks.beforeEach(function() {
      this.owner.register('component:svg-jar', MockSvgJarComponent);
    });

    const fileUploadSelector = buildNestedSelector(containerSelector, '.Polaris-DropZone-FileUpload');
    const fileUploadStackSelector = buildNestedSelector(fileUploadSelector, '.Polaris-Stack.Polaris-Stack--vertical');
    const fileUploadStackItemSelector = buildNestedSelector(fileUploadStackSelector, '.Polaris-Stack__Item');
    const fileUploadIconSelector = buildNestedSelector(
      fileUploadStackItemSelector,
      '.Polaris-Icon.Polaris-Icon--colorInkLightest.Polaris-Icon--isColored',
      'svg'
    );

    test('it renders properly', async function(assert) {
      await render(hbs`
        <div style="width: 113px;">
          {{#polaris-dropzone type=type as |dropzone|}}
            {{dropzone.fileUpload}}
          {{/polaris-dropzone}}
        </div>
      `);

      assert.dom(fileUploadSelector).exists('renders FileUpload component');
      assert.dom(fileUploadStackSelector).exists('fileUpload wraps content in a stack');
      assert.dom(fileUploadStackSelector).hasClass('Polaris-Stack--spacingTight', 'fileUpload wrapping stack is tight');
      assert.dom(fileUploadIconSelector).exists('fileUpload icon is rendered');
      assert.dom(fileUploadIconSelector).hasAttribute('data-icon-source', 'polaris/drag-drop', 'fileUpload icon is `drag-drop`');
    });
  });

  module('handles drag and drop events', function() {
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
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'drop', event);

      // Test with `accept` being set
      expectedAcceptedFiles = uploadedFiles.slice(0, 2);
      expectedRejectedFiles = uploadedFiles.slice(2, 3);

      await render(hbs`{{polaris-dropzone accept="image/*" onDrop=(action drop)}}`);
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'drop', event);
    });

    test('it calls onDrop callback when a drop event is fired on document', async function(assert) {
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

      // Test that by default the document will not trigger callbacks
      await render(hbs`{{polaris-dropzone onDrop=(action drop)}}`);
      await triggerEvent(document, 'drop', event);

      // Test that triggering callbacks on document when `dropOnPage` is true works
      await render(hbs`{{polaris-dropzone dropOnPage=true onDrop=(action drop)}}`);
      await triggerEvent(document, 'drop', event);

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
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'dragenter', event);
    });

    test('calls the onDragOver callback when a dragOver event is fired', async function(assert) {
      assert.expect(1);

      this.set('dragOver', () => {
        assert.ok('onDragOver callback is invoked');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone onDragOver=(action dragOver)}}`);
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'dragover', event);
    });

    test('calls the onDragLeave callback when a dragLeave event is fired', async function(assert) {
      assert.expect(1);

      this.set('dragLeave', () => {
        assert.ok('onDragLeave callback is invoked');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone onDragLeave=(action dragLeave)}}`);
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'dragleave', event);
    });

    test('it calls onDropAccepted callback correctly when it ony accepts images', async function(assert) {
      assert.expect(1);

      this.set('dropAccepted', (acceptedFiles) => {
        assert.deepEqual(acceptedFiles, uploadedFiles.slice(0, 2), 'onDropAccepted action receives correct `acceptedFiles`');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone accept="image/*" onDropAccepted=(action dropAccepted)}}`);
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'drop', event);
    });

    test('it calls onDropRejected callback correctly when it ony accepts images', async function(assert) {
      assert.expect(1);

      this.set('dropRejected', (rejectedFiles) => {
        assert.deepEqual(rejectedFiles, uploadedFiles.slice(2, 3), 'onDropRejected action receives correct `rejectedFiles`');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone accept="image/*" onDropRejected=(action dropRejected)}}`);
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'drop', event);
    });

    test('it calls onClick callback', async function(assert) {
      assert.expect(1);

      this.set('clickAction', () => {
        assert.ok('onClick is invoked');
      });

      let event = new MockEvent({ dataTransfer: { files: uploadedFiles } });

      await render(hbs`{{polaris-dropzone onClick=(action clickAction)}}`);
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'click', event);
    });

    test('should not call any callback when the dropzone is disabled', async function(assert) {
      assert.expect(0);

      for (let callback of ['drop', 'dropAccepted', 'dropRejected', 'dragEnter', 'dragLeave', 'dragOver']) {
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
      }}`);
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'drop', event);
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'dragenter', event);
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'dragleave', event);
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'dragover', event);
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
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'drop', event);
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
      await triggerEvent(this.element.querySelector(dropzoneSelector), 'drop', event);

      assert.dom(inputSelector).doesNotHaveAttribute('multiple', 'when `allowMultiple` is false, input element does not have `multiple` attribute');

    });
  });

  // test('it supports `active` property', async function(assert) {
  //   await render(hbs`{{#polaris-dropzone active=active as |dropzone|}}{{dropzone.fileUpload}}{{/polaris-dropzone}}`);

  //   assert.dom('.Polaris-DropZone.Polaris-DropZone--isDragging').doesNotExist('if `active` is not `true`, dropzone does not have `Polaris-DropZone--isDragging` class')

  //   // this.set('active', true);
  //   assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--isDragging', 'has isDragging class');
  //   debugger;
  // });

  // test('it has appropriate `size` property based on the parent element', async function(assert) {
  //   await render(hbs`
  //     <div width={{width}}>
  //       {{polaris-dropzone size=size}}
  //     </div>
  //   `);

  //   assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--sizeLarge', 'has large class');

  //   this.set('width', '299px');
  //   await triggerEvent(getRootElement(), 'resize');
  //   // debugger;
  //   // assert.dom(dropzoneSelector).hasClass('Polaris-DropZone--sizeSmall', 'has small class');
  // });
});
