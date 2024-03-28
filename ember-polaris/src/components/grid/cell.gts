import Component from '@glimmer/component';

import { htmlSafeStyle } from '../../utilities/ember-css';
import { classNames } from '../../utilities/css';
import styles from '../../styles/components/grid/cell.module.css';

type Breakpoints = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type CellType = {
  [Breakpoint in Breakpoints]?: string;
};

interface Columns {
  /** Number of columns the section should span on extra small screens */
  xs?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the section should span on small screens */
  sm?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the section should span on medium screens */
  md?: 1 | 2 | 3 | 4 | 5 | 6;
  /** Number of columns the section should span on large screens */
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Number of columns the section should span on extra large screens */
  xl?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface CellSignature {
  Element: HTMLDivElement;
  Args: {
    /**
     * Set grid-template-areas
     * @deprecated Use nested layout components instead
     */
    area?: string;
    column?: CellType;
    columnSpan?: Columns;
    row?: CellType;
  };
  Blocks: {
    default: [];
  };
}

export class Cell extends Component<CellSignature> {
  get className() {
    return classNames(
      styles.Cell,
      this.args.columnSpan?.xs && styles[`Cell-${this.args.columnSpan.xs}-column-xs`],
      this.args.columnSpan?.sm && styles[`Cell-${this.args.columnSpan.sm}-column-sm`],
      this.args.columnSpan?.md && styles[`Cell-${this.args.columnSpan.md}-column-md`],
      this.args.columnSpan?.lg && styles[`Cell-${this.args.columnSpan.lg}-column-lg`],
      this.args.columnSpan?.xl && styles[`Cell-${this.args.columnSpan.xl}-column-xl`]
    );
  }

  get style() {
    return htmlSafeStyle({
      'grid-area': this.args.area,
      '--pc-column-xs': this.args.column?.xs,
      '--pc-column-sm': this.args.column?.sm,
      '--pc-column-md': this.args.column?.md,
      '--pc-column-lg': this.args.column?.lg,
      '--pc-column-xl': this.args.column?.xl,
      '--pc-row-xs': this.args.row?.xs,
      '--pc-row-sm': this.args.row?.sm,
      '--pc-row-md': this.args.row?.md,
      '--pc-row-lg': this.args.row?.lg,
      '--pc-row-xl': this.args.row?.xl,
    });
  }

  <template>
    <div class={{this.className}} style={{this.style}}>
      {{yield}}
    </div>
  </template>
}

export default Cell;
