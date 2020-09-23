import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, triggerEvent } from '@ember/test-helpers';

const defaultProps = {
  id: 'recommended-products',
  title: 'Recommended products',
  options: [
    {
      value: '5',
      label: 'Item one',
    },
    {
      value: '6',
      label: 'Item two',
      disabled: true,
    },
    {
      value: '7',
      label: 'Item three',
    },
  ],
  sections: [
    {
      title: 'Other products',
      options: [
        {
          value: '8',
          label: 'Item four',
        },
        {
          value: '9',
          label: 'Item five',
        },
      ],
    },
    {
      options: [
        {
          value: '10',
          label: 'Item six',
          disabled: true,
        },
        {
          value: '11',
          label: 'Item seven',
        },
      ],
    },
  ],
  selected: [],
};

module('Integration | Component | polaris-option-list', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.set('defaultProps', defaultProps);
  });

  test('renders options and sections', async function (assert) {
    const { options, sections } = defaultProps;
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=defaultProps.options
        sections=defaultProps.sections
        selected=defaultProps.selected
      }}
    `);

    assert
      .dom('.Polaris-OptionList-Option')
      .exists({ count: totalOptions(options, sections) });
  });

  test('renders sections', async function (assert) {
    const { sections } = defaultProps;
    const options = [];
    this.set('options', options);
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=options
        sections=defaultProps.sections
        selected=defaultProps.selected
      }}
    `);

    assert
      .dom('.Polaris-OptionList-Option')
      .exists({ count: totalOptions(options, sections) });
  });

  test('renders options', async function (assert) {
    const { options } = defaultProps;
    const sections = [];
    this.set('sections', sections);
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=defaultProps.options
        sections=sections
        selected=defaultProps.selected
      }}
    `);

    assert
      .dom('.Polaris-OptionList-Option')
      .exists({ count: totalOptions(options, sections) });
  });

  test('re-renders with new options passed in', async function (assert) {
    const { sections, options } = defaultProps;
    this.set('options', options);
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=options
        sections=defaultProps.sections
        selected=defaultProps.selected
      }}
    `);

    const newOptions = [
      {
        value: '5',
        label: 'Item one',
      },
      {
        value: '6',
        label: 'Item two',
        disabled: true,
      },
    ];

    this.set('options', newOptions);

    assert
      .dom('.Polaris-OptionList-Option')
      .exists({ count: totalOptions(newOptions, sections) });
  });

  test('re-renders with new sections passed in', async function (assert) {
    const { sections, options } = defaultProps;
    this.set('sections', sections);
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=defaultProps.options
        sections=sections
        selected=defaultProps.selected
      }}
    `);

    const newSections = [
      {
        title: 'Other products',
        options: [
          {
            value: '8',
            label: 'Item four',
          },
          {
            value: '9',
            label: 'Item five',
          },
        ],
      },
    ];

    this.set('sections', newSections);

    assert
      .dom('.Polaris-OptionList-Option')
      .exists({ count: totalOptions(options, newSections) });
  });

  test('re-renders with new options and new sections passed in', async function (assert) {
    const { options, sections } = defaultProps;
    this.setProperties({ options, sections });
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=options
        sections=sections
        selected=defaultProps.selected
      }}
    `);

    const newOptions = [
      {
        value: '5',
        label: 'Item one',
      },
      {
        value: '6',
        label: 'Item two',
        disabled: true,
      },
    ];

    const newSections = [
      {
        title: 'Other products',
        options: [
          {
            value: '8',
            label: 'Item four',
          },
          {
            value: '9',
            label: 'Item five',
          },
        ],
      },
    ];

    this.setProperties({
      options: newOptions,
      sections: newSections,
    });

    assert
      .dom('.Polaris-OptionList-Option')
      .exists({ count: totalOptions(newOptions, newSections) });
  });

  test('re-renders with undefined options', async function (assert) {
    const { sections, options } = defaultProps;
    this.set('options', options);
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=options
        sections=defaultProps.sections
        selected=defaultProps.selected
      }}
    `);

    this.set('options', undefined);

    assert
      .dom('.Polaris-OptionList-Option')
      .exists({ count: totalOptions([], sections) });
  });

  test('re-renders with undefined sections', async function (assert) {
    const { sections, options } = defaultProps;
    this.set('sections', sections);
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=defaultProps.options
        sections=sections
        selected=defaultProps.selected
      }}
    `);

    this.set('sections', undefined);

    assert
      .dom('.Polaris-OptionList-Option')
      .exists({ count: totalOptions(options, []) });
  });

  test('re-renders with undefined options and new sections', async function (assert) {
    const { options, sections } = defaultProps;
    this.setProperties({ options, sections });
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=options
        sections=sections
        selected=defaultProps.selected
      }}
    `);

    const newSections = [
      {
        title: 'Other products',
        options: [
          {
            value: '8',
            label: 'Item four',
          },
          {
            value: '9',
            label: 'Item five',
          },
        ],
      },
    ];

    this.setProperties({
      options: undefined,
      sections: newSections,
    });

    assert
      .dom('.Polaris-OptionList-Option')
      .exists({ count: totalOptions(undefined, newSections) });
  });

  test('re-renders with new options and undefined sections', async function (assert) {
    const { options, sections } = defaultProps;
    this.setProperties({ options, sections });
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=options
        sections=sections
        selected=defaultProps.selected
      }}
    `);

    const newOptions = [
      {
        value: '5',
        label: 'Item one',
      },
      {
        value: '6',
        label: 'Item two',
        disabled: true,
      },
    ];

    this.setProperties({
      options: newOptions,
      sections: undefined,
    });

    assert
      .dom('.Polaris-OptionList-Option')
      .exists({ count: totalOptions(newOptions, undefined) });
  });

  test('calls onChange with options and sections', async function (assert) {
    const { options, sections } = defaultProps;
    await render(hbs`
      {{polaris-option-list
        id=defaultProps.id
        title=defaultProps.title
        options=defaultProps.options
        sections=defaultProps.sections
        selected=defaultProps.selected
        onChange=(action (mut changeParams))
      }}
    `);

    await click('button');

    assert.ok(this.get('changeParams'));
    assert.deepEqual(this.get('changeParams'), [
      firstOption(options, sections),
    ]);
  });

  module('allowMultiple', function () {
    test('renders options and sections', async function (assert) {
      const { options, sections } = defaultProps;
      await render(hbs`
        {{polaris-option-list
          id=defaultProps.id
          title=defaultProps.title
          options=defaultProps.options
          sections=defaultProps.sections
          selected=defaultProps.selected
          allowMultiple=true
        }}
      `);

      assert
        .dom('.Polaris-OptionList-Option')
        .exists({ count: totalOptions(options, sections) });
    });

    test('renders sections', async function (assert) {
      const { sections } = defaultProps;
      const options = [];
      this.set('options', options);
      await render(hbs`
        {{polaris-option-list
          id=defaultProps.id
          title=defaultProps.title
          options=options
          sections=defaultProps.sections
          selected=defaultProps.selected
          allowMultiple=true
        }}
      `);

      assert
        .dom('.Polaris-OptionList-Option')
        .exists({ count: totalOptions(options, sections) });
    });

    test('renders options', async function (assert) {
      const { options } = defaultProps;
      const sections = [];
      this.set('sections', sections);
      await render(hbs`
        {{polaris-option-list
          id=defaultProps.id
          title=defaultProps.title
          options=defaultProps.options
          sections=sections
          selected=defaultProps.selected
          allowMultiple=true
        }}
      `);

      assert
        .dom('.Polaris-OptionList-Option')
        .exists({ count: totalOptions(options, sections) });
    });

    test('re-renders with new options passed in', async function (assert) {
      const { sections, options } = defaultProps;
      this.set('options', options);
      await render(hbs`
        {{polaris-option-list
          id=defaultProps.id
          title=defaultProps.title
          options=options
          sections=defaultProps.sections
          selected=defaultProps.selected
          allowMultiple=true
        }}
      `);

      const newOptions = [
        {
          value: '5',
          label: 'Item one',
        },
        {
          value: '6',
          label: 'Item two',
          disabled: true,
        },
      ];

      this.set('options', newOptions);

      assert
        .dom('.Polaris-OptionList-Option')
        .exists({ count: totalOptions(newOptions, sections) });
    });

    test('re-renders with new sections passed in', async function (assert) {
      const { sections, options } = defaultProps;
      this.set('sections', sections);
      await render(hbs`
        {{polaris-option-list
          id=defaultProps.id
          title=defaultProps.title
          options=defaultProps.options
          sections=sections
          selected=defaultProps.selected
          allowMultiple=true
        }}
      `);

      const newSections = [
        {
          title: 'Other products',
          options: [
            {
              value: '8',
              label: 'Item four',
            },
            {
              value: '9',
              label: 'Item five',
            },
          ],
        },
      ];

      this.set('sections', newSections);

      assert
        .dom('.Polaris-OptionList-Option')
        .exists({ count: totalOptions(options, newSections) });
    });

    test('re-renders with new options and new sections passed in', async function (assert) {
      const { options, sections } = defaultProps;
      this.setProperties({ options, sections });
      await render(hbs`
        {{polaris-option-list
          id=defaultProps.id
          title=defaultProps.title
          options=options
          sections=sections
          selected=defaultProps.selected
          allowMultiple=true
        }}
      `);

      const newOptions = [
        {
          value: '5',
          label: 'Item one',
        },
        {
          value: '6',
          label: 'Item two',
          disabled: true,
        },
      ];

      const newSections = [
        {
          title: 'Other products',
          options: [
            {
              value: '8',
              label: 'Item four',
            },
            {
              value: '9',
              label: 'Item five',
            },
          ],
        },
      ];

      this.setProperties({
        options: newOptions,
        sections: newSections,
      });

      assert
        .dom('.Polaris-OptionList-Option')
        .exists({ count: totalOptions(newOptions, newSections) });
    });

    test('re-renders with undefined options', async function (assert) {
      const { sections, options } = defaultProps;
      this.set('options', options);
      await render(hbs`
        {{polaris-option-list
          id=defaultProps.id
          title=defaultProps.title
          options=options
          sections=defaultProps.sections
          selected=defaultProps.selected
          allowMultiple=true
        }}
      `);

      this.set('options', undefined);

      assert
        .dom('.Polaris-OptionList-Option')
        .exists({ count: totalOptions([], sections) });
    });

    test('re-renders with undefined sections', async function (assert) {
      const { sections, options } = defaultProps;
      this.set('sections', sections);
      await render(hbs`
        {{polaris-option-list
          id=defaultProps.id
          title=defaultProps.title
          options=defaultProps.options
          sections=sections
          selected=defaultProps.selected
          allowMultiple=true
        }}
      `);

      this.set('sections', undefined);

      assert
        .dom('.Polaris-OptionList-Option')
        .exists({ count: totalOptions(options, []) });
    });

    test('re-renders with undefined options and new sections', async function (assert) {
      const { options, sections } = defaultProps;
      this.setProperties({ options, sections });
      await render(hbs`
        {{polaris-option-list
          id=defaultProps.id
          title=defaultProps.title
          options=options
          sections=sections
          selected=defaultProps.selected
          allowMultiple=true
        }}
      `);

      const newSections = [
        {
          title: 'Other products',
          options: [
            {
              value: '8',
              label: 'Item four',
            },
            {
              value: '9',
              label: 'Item five',
            },
          ],
        },
      ];

      this.setProperties({
        options: undefined,
        sections: newSections,
      });

      assert
        .dom('.Polaris-OptionList-Option')
        .exists({ count: totalOptions(undefined, newSections) });
    });

    test('re-renders with new options and undefined sections', async function (assert) {
      const { options, sections } = defaultProps;
      this.setProperties({ options, sections });
      await render(hbs`
        {{polaris-option-list
          id=defaultProps.id
          title=defaultProps.title
          options=options
          sections=sections
          selected=defaultProps.selected
          allowMultiple=true
        }}
      `);

      const newOptions = [
        {
          value: '5',
          label: 'Item one',
        },
        {
          value: '6',
          label: 'Item two',
          disabled: true,
        },
      ];

      this.setProperties({
        options: newOptions,
        sections: undefined,
      });

      assert
        .dom('.Polaris-OptionList-Option')
        .exists({ count: totalOptions(newOptions, undefined) });
    });

    module('onChange', function () {
      test('selects an item when nothing was selected', async function (assert) {
        const { options, sections } = defaultProps;
        await render(hbs`
          {{polaris-option-list
            id=defaultProps.id
            title=defaultProps.title
            options=defaultProps.options
            sections=defaultProps.sections
            selected=defaultProps.selected
            onChange=(action (mut changeParams))
            allowMultiple=true
          }}
        `);

        await triggerEvent('input', 'change');

        assert.ok(this.get('changeParams'));
        assert.deepEqual(this.get('changeParams'), [
          firstOption(options, sections),
        ]);
      });

      test('selects an item when multiple items are selected', async function (assert) {
        const { options, sections } = defaultProps;
        const selected = ['11', '8'];
        this.set('selected', selected);
        await render(hbs`
          {{polaris-option-list
            id=defaultProps.id
            title=defaultProps.title
            options=defaultProps.options
            sections=defaultProps.sections
            selected=selected
            onChange=(action (mut changeParams))
            allowMultiple=true
          }}
        `);

        await triggerEvent('input', 'change');

        assert.ok(this.get('changeParams'));
        assert.deepEqual(this.get('changeParams'), [
          firstOption(options, sections),
          ...selected,
        ]);
      });

      test('deselects an item when it is already selected', async function (assert) {
        const { options, sections } = defaultProps;
        const selected = ['10', '8', '5'];
        this.set('selected', selected);
        await render(hbs`
          {{polaris-option-list
            id=defaultProps.id
            title=defaultProps.title
            options=defaultProps.options
            sections=defaultProps.sections
            selected=selected
            onChange=(action (mut changeParams))
            allowMultiple=true
          }}
        `);

        await triggerEvent('input', 'change');

        const valueToCheck = firstOption(options, sections);
        const newSelected = selected.filter((value) => value !== valueToCheck);

        assert.ok(this.get('changeParams'));
        assert.deepEqual(this.get('changeParams'), newSelected);
      });
    });
  });
});

function firstOption(options, sections) {
  const firstOptionsValue =
    options == null || options === [] ? '' : options[0].value;
  const firstSectionOptionsValue =
    sections == null || sections === [] || sections[0].options === []
      ? ''
      : sections[0].options[0].value;
  return firstOptionsValue || firstSectionOptionsValue;
}

function totalOptions(options, sections) {
  return (
    (options == null ? 0 : options.length) +
    (sections == null
      ? 0
      : sections.reduce((total, { options }) => {
          return total + options.length;
        }, 0))
  );
}
