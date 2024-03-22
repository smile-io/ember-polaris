import Component from '@glimmer/component';
import { element } from 'ember-element-helper';
import type { AriaRole, AllHTMLAttributes } from 'react';
import type {
  ColorTextAlias,
  ColorBackgroundAlias,
  ColorBorderAlias,
  BorderWidthScale,
  BorderRadiusAliasOrScale,
  ShadowAliasOrScale,
  SpaceScale,
} from '@shopify/polaris-tokens';

import { getResponsiveProps, classNames } from '../utilities/css';
import { htmlSafeStyle } from '../utilities/ember-css.ts';
import type { ResponsiveProp } from '../utilities/css';

import styles from '../styles/components/box.module.scss';

export type Element = 'div' | 'span' | 'section' | 'legend' | 'ul' | 'li';

type LineStyles = 'solid' | 'dashed';
type Overflow = 'hidden' | 'scroll' | 'clip';
type Position = 'relative' | 'absolute' | 'fixed' | 'sticky';

type Spacing = ResponsiveProp<SpaceScale>;

export interface BoxSignature {
  Element: HTMLElement;
  Args: {
    /** HTML Element type
     * @default 'div'
     */
    as?: Element;
    /** Background color */
    background?: ColorBackgroundAlias;
    /** Border color */
    borderColor?: ColorBorderAlias | 'transparent';
    /** Border style */
    borderStyle?: LineStyles;
    /** Border radius */
    borderRadius?: BorderRadiusAliasOrScale;
    /** Vertical end horizontal start border radius */
    borderEndStartRadius?: BorderRadiusAliasOrScale;
    /** Vertical end horizontal end border radius */
    borderEndEndRadius?: BorderRadiusAliasOrScale;
    /** Vertical start horizontal start border radius */
    borderStartStartRadius?: BorderRadiusAliasOrScale;
    /** Vertical start horizontal end border radius */
    borderStartEndRadius?: BorderRadiusAliasOrScale;
    /** Border width */
    borderWidth?: BorderWidthScale;
    /** Vertical start border width */
    borderBlockStartWidth?: BorderWidthScale;
    /** Vertical end border width */
    borderBlockEndWidth?: BorderWidthScale;
    /** Horizontal start border width */
    borderInlineStartWidth?: BorderWidthScale;
    /** Horizontal end border width */
    borderInlineEndWidth?: BorderWidthScale;
    /** Color of children */
    color?: ColorTextAlias;
    /** HTML id attribute */
    id?: string;
    /** Minimum height of container */
    minHeight?: string;
    /** Minimum width of container */
    minWidth?: string;
    /** Maximum width of container */
    maxWidth?: string;
    /** Clip horizontal content of children */
    overflowX?: Overflow;
    /** Clip vertical content of children */
    overflowY?: Overflow;
    /** Spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * padding='400'
     * padding={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
     */
    padding?: Spacing;
    /** Vertical start and end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * paddingBlock='400'
     * paddingBlock={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
     */
    paddingBlock?: Spacing;
    /** Vertical start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * paddingBlockStart='400'
     * paddingBlockStart={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
     */
    paddingBlockStart?: Spacing;
    /** Vertical end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * paddingBlockEnd='400'
     * paddingBlockEnd={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
     */
    paddingBlockEnd?: Spacing;
    /** Horizontal start and end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * paddingInline='400'
     * paddingInline={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
     */
    paddingInline?: Spacing;
    /** Horizontal start spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * paddingInlineStart='400'
     * paddingInlineStart={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
     */
    paddingInlineStart?: Spacing;
    /** Horizontal end spacing around children. Accepts a spacing token or an object of spacing tokens for different screen sizes.
     * @example
     * paddingInlineEnd='400'
     * paddingInlineEnd={{xs: '200', sm: '300', md: '400', lg: '500', xl: '600'}}
     */
    paddingInlineEnd?: Spacing;
    /** Aria role */
    role?: Extract<AriaRole, 'status' | 'presentation' | 'menu' | 'listbox' | 'combobox' | 'group'>;
    /** Shadow on box */
    shadow?: ShadowAliasOrScale;
    /** Set tab order */
    tabIndex?: Extract<AllHTMLAttributes<HTMLElement>['tabIndex'], number>;
    /** Width of container */
    width?: string;
    // These could be moved to new layout component(s) in the future
    /** Position of box */
    position?: Position;
    /** Top position of box */
    insetBlockStart?: Spacing;
    /** Bottom position of box */
    insetBlockEnd?: Spacing;
    /** Left position of box */
    insetInlineStart?: Spacing;
    /** Right position of box */
    insetInlineEnd?: Spacing;
    /** Opacity of box */
    opacity?: string;
    /** Outline color */
    outlineColor?: ColorBorderAlias;
    /** Outline style */
    outlineStyle?: LineStyles;
    /** Outline width */
    outlineWidth?: BorderWidthScale;
    /** Visually hide the contents during print */
    printHidden?: boolean;
    /** Visually hide the contents (still announced by screenreader) */
    visuallyHidden?: boolean;
    /** z-index of box */
    zIndex?: string;
  };
  Blocks: {
    default: [];
  };
}

export class Box extends Component<BoxSignature> {
  get as(): Element {
    return this.args.as || 'div';
  }

  get borderStyleValue() {
    return this.args.borderStyle
      ? this.args.borderStyle
      : this.args.borderColor ||
          this.args.borderWidth ||
          this.args.borderBlockStartWidth ||
          this.args.borderBlockEndWidth ||
          this.args.borderInlineStartWidth ||
          this.args.borderInlineEndWidth
        ? 'solid'
        : undefined;
  }

  get outlineStyleValue() {
    return this.args.outlineStyle
      ? this.args.outlineStyle
      : this.args.outlineColor || this.args.outlineWidth
        ? 'solid'
        : undefined;
  }

  get style() {
    const {
      background,
      borderBlockEndWidth,
      borderBlockStartWidth,
      borderColor,
      borderEndEndRadius,
      borderEndStartRadius,
      borderInlineEndWidth,
      borderInlineStartWidth,
      borderRadius,
      borderStartEndRadius,
      borderStartStartRadius,

      borderWidth,
      color,
      insetBlockEnd,
      insetBlockStart,
      insetInlineEnd,
      insetInlineStart,
      maxWidth,
      minHeight,
      minWidth,
      opacity,
      outlineColor,

      outlineWidth,
      overflowX,
      overflowY,
      padding,
      paddingBlock,
      paddingBlockEnd,
      paddingBlockStart,
      paddingInline,
      paddingInlineEnd,
      paddingInlineStart,
      position,
      shadow,
      width,
      zIndex,
    } = this.args;

    return htmlSafeStyle({
      '--pc-box-color': color ? `var(--p-color-${color})` : undefined,
      '--pc-box-background': background ? `var(--p-color-${background})` : undefined,
      // eslint-disable-next-line no-nested-ternary
      '--pc-box-border-color': borderColor
        ? borderColor === 'transparent'
          ? 'transparent'
          : `var(--p-color-${borderColor})`
        : undefined,
      '--pc-box-border-style': this.borderStyleValue,
      '--pc-box-border-radius': borderRadius ? `var(--p-border-radius-${borderRadius})` : undefined,
      '--pc-box-border-end-start-radius': borderEndStartRadius
        ? `var(--p-border-radius-${borderEndStartRadius})`
        : undefined,
      '--pc-box-border-end-end-radius': borderEndEndRadius
        ? `var(--p-border-radius-${borderEndEndRadius})`
        : undefined,
      '--pc-box-border-start-start-radius': borderStartStartRadius
        ? `var(--p-border-radius-${borderStartStartRadius})`
        : undefined,
      '--pc-box-border-start-end-radius': borderStartEndRadius
        ? `var(--p-border-radius-${borderStartEndRadius})`
        : undefined,
      '--pc-box-border-width': borderWidth ? `var(--p-border-width-${borderWidth})` : undefined,
      '--pc-box-border-block-start-width': borderBlockStartWidth
        ? `var(--p-border-width-${borderBlockStartWidth})`
        : undefined,
      '--pc-box-border-block-end-width': borderBlockEndWidth
        ? `var(--p-border-width-${borderBlockEndWidth})`
        : undefined,
      '--pc-box-border-inline-start-width': borderInlineStartWidth
        ? `var(--p-border-width-${borderInlineStartWidth})`
        : undefined,
      '--pc-box-border-inline-end-width': borderInlineEndWidth
        ? `var(--p-border-width-${borderInlineEndWidth})`
        : undefined,
      '--pc-box-min-height': minHeight,
      '--pc-box-min-width': minWidth,
      '--pc-box-max-width': maxWidth,
      '--pc-box-outline-color': outlineColor ? `var(--p-color-${outlineColor})` : undefined,
      '--pc-box-outline-style': this.outlineStyleValue,
      '--pc-box-outline-width': outlineWidth ? `var(--p-border-width-${outlineWidth})` : undefined,
      '--pc-box-overflow-x': overflowX,
      '--pc-box-overflow-y': overflowY,
      ...getResponsiveProps(
        'box',
        'padding-block-start',
        'space',
        paddingBlockStart || paddingBlock || padding
      ),
      ...getResponsiveProps(
        'box',
        'padding-block-end',
        'space',
        paddingBlockEnd || paddingBlock || padding
      ),
      ...getResponsiveProps(
        'box',
        'padding-inline-start',
        'space',
        paddingInlineStart || paddingInline || padding
      ),
      ...getResponsiveProps(
        'box',
        'padding-inline-end',
        'space',
        paddingInlineEnd || paddingInline || padding
      ),
      '--pc-box-shadow': shadow ? `var(--p-shadow-${shadow})` : undefined,
      '--pc-box-width': width,
      position,
      '--pc-box-inset-block-start': insetBlockStart
        ? `var(--p-space-${insetBlockStart})`
        : undefined,
      '--pc-box-inset-block-end': insetBlockEnd ? `var(--p-space-${insetBlockEnd})` : undefined,
      '--pc-box-inset-inline-start': insetInlineStart
        ? `var(--p-space-${insetInlineStart})`
        : undefined,
      '--pc-box-inset-inline-end': insetInlineEnd ? `var(--p-space-${insetInlineEnd})` : undefined,
      zIndex,
      opacity,
    });
  }

  get className() {
    return classNames(
      styles.Box,
      this.args.visuallyHidden && styles.visuallyHidden,
      this.args.printHidden && styles.printHidden,
      this.args.as === 'ul' && styles.listReset
    );
  }

  <template>
    {{#let (element this.as) as |Tag|}}
      <Tag
        class={{this.className}}
        style={{this.style}}
        id={{@id}}
        role={{@role}}
        tabIndex={{@tabIndex}}
        ...attributes
      >
        {{yield}}
      </Tag>
    {{/let}}
  </template>
}

export default Box;
