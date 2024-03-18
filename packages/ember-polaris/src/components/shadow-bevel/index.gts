import Component from '@glimmer/component';
import { element } from 'ember-element-helper';
import type { AttrValue } from '@glint/template';
import { htmlSafe } from '@ember/template';
import type {
  BorderRadiusAliasOrScale,
  ShadowAliasOrScale,
} from '@shopify/polaris-tokens';

import {
  getResponsiveValue,
  sanitizeCustomProperties,
} from '../../utilities/css';
import type { CSSProperties, ResponsiveProp } from '../../utilities/css';

import styles from './shadow-bevel.module.scss';

export interface ShadowBevelSignature {
  Element: HTMLElement;
  Args: {
    // TODO match React.ElementType
    // as?: React.ElementType;
    as?: string;
    /** The box-shadow applied to the root element. */
    boxShadow: ShadowAliasOrScale;
    /** The border-radius applied to both the root and pseudo elements. */
    borderRadius: BorderRadiusAliasOrScale;
    /** The z-index applied to the pseudo element. */
    zIndex?: string;
    /**
     * Enable/disable the bevel effect.
     * Note: This also disables the border-radius and box-shadow.
     * @default true
     */
    bevel?: ResponsiveProp<boolean>;
  };
  Blocks: {
    default: [];
  };
}

export class ShadowBevel extends Component<ShadowBevelSignature> {
  get bevel(): ResponsiveProp<boolean> {
    return this.args.bevel ?? true;
  }

  get tagName() {
    return this.args.as || 'div';
  }

  get style(): AttrValue {
    const style = {
      '--pc-shadow-bevel-z-index': this.args.zIndex ?? '0',
      ...getResponsiveValue(
        'shadow-bevel',
        'content',
        mapResponsiveProp(this.bevel, (bevel) => (bevel ? '""' : 'none')),
      ),
      ...getResponsiveValue(
        'shadow-bevel',
        'box-shadow',
        mapResponsiveProp(this.bevel, (bevel) =>
          bevel ? `var(--p-shadow-${this.args.boxShadow})` : 'none',
        ),
      ),
      ...getResponsiveValue(
        'shadow-bevel',
        'border-radius',
        mapResponsiveProp(this.bevel, (bevel) =>
          bevel
            ? `var(--p-border-radius-${this.args.borderRadius})`
            : 'var(--p-border-radius-0)',
        ),
      ),
    } as CSSProperties;

    const sanitizedStyle = sanitizeCustomProperties(style);
    if (!sanitizedStyle) {
      return undefined;
    }

    const styles = Object.entries(sanitizedStyle).map(
      ([key, value]) => `${key}: ${value}`,
    );

    return htmlSafe(styles.join(';'));
  }

  <template>
    {{#let (element this.tagName) as |Tag|}}
      <Tag class={{styles.ShadowBevel}} style={{this.style}}>{{yield}}</Tag>
    {{/let}}
  </template>
}

function mapResponsiveProp(
  responsiveProp: ResponsiveProp<boolean>,
  callback: (value: boolean) => string,
): ResponsiveProp<string> {
  if (typeof responsiveProp === 'boolean') {
    return callback(responsiveProp);
  }

  return Object.fromEntries(
    Object.entries(responsiveProp).map(([breakpointsAlias, value]) => [
      breakpointsAlias,
      callback(value),
    ]),
  );
}

export default ShadowBevel;
