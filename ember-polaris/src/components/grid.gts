import Component from '@glimmer/component';

import { htmlSafeStyle } from '../utilities/ember-css';
import styles from '../styles/components/grid.module.css';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type Areas = {
  [Breakpoint in Breakpoints]?: string[];
};

type Columns = {
  [Breakpoint in Breakpoints]?: number;
};

type Gap = {
  [Breakpoint in Breakpoints]?: string;
};

export interface GridSignature {
  Element: HTMLDivElement;
  Args: {
    /**
     * Set grid-template-areas
     * @deprecated Use nested layout components instead
     */
    areas?: Areas;
    /* Number of columns */
    columns?: Columns;
    /* Grid gap */
    gap?: Gap;
  };
  Blocks: {
    default: [];
  };
}

export class Grid extends Component<GridSignature> {
  get style() {
    return htmlSafeStyle({
      '--pc-grid-gap-xs': this.args.gap?.xs,
      '--pc-grid-gap-sm': this.args.gap?.sm,
      '--pc-grid-gap-md': this.args.gap?.md,
      '--pc-grid-gap-lg': this.args.gap?.lg,
      '--pc-grid-gap-xl': this.args.gap?.xl,
      '--pc-grid-columns-xs': this.args.columns?.xs,
      '--pc-grid-columns-sm': this.args.columns?.sm,
      '--pc-grid-columns-md': this.args.columns?.md,
      '--pc-grid-columns-lg': this.args.columns?.lg,
      '--pc-grid-columns-xl': this.args.columns?.xl,
      '--pc-grid-areas-xs': formatAreas(this.args.areas?.xs),
      '--pc-grid-areas-sm': formatAreas(this.args.areas?.sm),
      '--pc-grid-areas-md': formatAreas(this.args.areas?.md),
      '--pc-grid-areas-lg': formatAreas(this.args.areas?.lg),
      '--pc-grid-areas-xl': formatAreas(this.args.areas?.xl),
    });
  }

  <template>
    <div class={{styles.Grid}} style={{this.style}} ...attributes>
      {{yield}}
    </div>
  </template>
}

export function formatAreas(areas?: string[]) {
  if (!areas) return;
  return `'${areas?.join(`' '`)}'`;
}

export default Grid;
