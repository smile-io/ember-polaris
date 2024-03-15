import Component from '@glimmer/component';
import { element } from 'ember-element-helper';

import { classNames } from '../../utilities/css';
import styles from './text.module.scss';

type Element =
  | 'dt'
  | 'dd'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'span'
  | 'strong'
  | 'legend';

type Variant =
  | 'headingXs'
  | 'headingSm'
  | 'headingMd'
  | 'headingLg'
  | 'headingXl'
  | 'heading2xl'
  | 'heading3xl'
  | 'bodyXs'
  | 'bodySm'
  | 'bodyMd'
  | 'bodyLg';

type Alignment = 'start' | 'center' | 'end' | 'justify';

type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold';

type Tone =
  | 'success'
  | 'critical'
  | 'caution'
  | 'subdued'
  | 'text-inverse'
  | 'magic'
  | 'magic-subdued';

type TextDecorationLine = 'line-through';

const deprecatedVariants: { [V in Variant]?: Variant } = {
  heading2xl: 'headingXl',
  heading3xl: 'headingXl',
};

export interface TextSignature {
  Element: HTMLElement;
  Args: {
    /** Adjust horizontal alignment of text */
    alignment?: Alignment;
    /** The element type */
    as: Element;
    /** Prevent text from overflowing */
    breakWord?: boolean;
    /** Adjust tone of text */
    tone?: Tone;
    /** Adjust weight of text */
    fontWeight?: FontWeight;
    /** HTML id attribute */
    id?: string;
    /** Use a numeric font variant with monospace appearance */
    numeric?: boolean;
    /** Truncate text overflow with ellipsis */
    truncate?: boolean;
    /** Typographic style of text */
    variant?: Variant;
    /** Visually hide the text */
    visuallyHidden?: boolean;
    /** Add a line-through to the text */
    textDecorationLine?: TextDecorationLine;
  };
  Blocks: {
    default: [];
  };
}

export default class Text extends Component<TextSignature> {
  get tagName() {
    return this.args.as || (this.args.visuallyHidden ? 'span' : 'p');
  }

  get className() {
    return classNames(
      styles.root,
      this.args.variant && styles[this.args.variant],
      this.args.fontWeight && styles[this.args.fontWeight],
      (this.args.alignment || this.args.truncate) && styles.block,
      this.args.alignment && styles[this.args.alignment],
      this.args.breakWord && styles.break,
      this.args.tone && styles[this.args.tone],
      this.args.numeric && styles.numeric,
      this.args.truncate && styles.truncate,
      this.args.visuallyHidden && styles.visuallyHidden,
      this.args.textDecorationLine && styles[this.args.textDecorationLine],
    );
  }

  constructor(owner: unknown, args: TextSignature['Args']) {
    super(owner, args);

    // TODO make this dev only
    if (
      // process.env.NODE_ENV === 'development' &&
      this.args.variant &&
      Object.prototype.hasOwnProperty.call(
        deprecatedVariants,
        this.args.variant,
      )
    ) {
      // eslint-disable-next-line no-console
      console.warn(
        `Deprecation: <Text variant="${this.args.variant}" />. The value "${
          this.args.variant
        }" will be removed in a future major version of Polaris. Use "${
          deprecatedVariants[this.args.variant]
        }" instead.`,
      );
    }
  }

  <template>
    {{#let (element this.tagName) as |Tag|}}
      <Tag class={{this.className}} id={{@id}}>
        {{yield}}
      </Tag>
    {{/let}}
  </template>
}
