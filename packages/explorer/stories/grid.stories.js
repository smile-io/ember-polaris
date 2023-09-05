import { hbs } from 'ember-cli-htmlbars';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Grid',
  argTypes: {
    columns: {
      description: 'Number of columns',
      control: 'number',
    },
    columnSpan: {
      description: '',
      control: 'object',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
  },
};

const Template = (args) => ({
  template: hbs`
    <Grid @columns={{this.columns}}>
      <Grid::Cell @columnSpan={{this.columnSpan1}}>
        <h1>Sales</h1>
        <p>View a summary of your online store’s sales.< /p>
      </Grid::Cell>

      <Grid::Cell @columnSpan={{this.columnSpan2}}>
        <h1>Orders</h1>
        <p>View a summary of your online store’s sales.< /p>
      </Grid::Cell>
    </Grid>
  `,
  context: args,
});

export const TwoColumn = Template.bind({});
TwoColumn.args = {
  columnSpan1: {
    xs: 6,
    sm: 3,
    md: 3,
    lg: 6,
    xl: 6,
  },
  columnSpan2: {
    xs: 6,
    sm: 3,
    md: 3,
    lg: 6,
    xl: 6,
  },
};

export const TwoThirdsAndOneThirdColumn = Template.bind({});
TwoThirdsAndOneThirdColumn.args = {
  columns: { sm: 3 },
  columnSpan1: {
    xs: 6,
    sm: 4,
    md: 4,
    lg: 8,
    xl: 8,
  },
  columnSpan2: {
    xs: 6,
    sm: 4,
    md: 4,
    lg: 2,
    xl: 2,
  },
};

export const ThreeOneThirdColumn = () => ({
  template: hbs`
    <Grid>
      <Grid::Cell @columnSpan={{this.columnSpan}}>
        <h1>Sales</h1>
        <p>View a summary of your online store’s sales.< /p>
      </Grid::Cell>

      <Grid::Cell @columnSpan={{this.columnSpan}}>
        <h1>Orders</h1>
        <p>View a summary of your online store’s sales.< /p>
      </Grid::Cell>

      <Grid::Cell @columnSpan={{this.columnSpan}}>
        <h1>Orders</h1>
        <p>View a summary of your online store’s sales.< /p>
      </Grid::Cell>
    </Grid>
  `,
  context: {
    columnSpan: {
      xs: 6,
      sm: 2,
      md: 2,
      lg: 4,
      xl: 4,
    },
  },
});

export const CustomLayout = () => ({
  template: hbs`
    <Grid @columns={{this.columns}} @areas={{this.areas}}>
      <Grid::Cell @area='product'>
        <div style="height: 60px; background: var(--p-color-text-info);"/>
      </Grid::Cell>

      <Grid::Cell @area="sales">
        <div style="height: 60px; background: var(--p-color-text-info);"/>
      </Grid::Cell>

      <Grid::Cell @area="orders">
        <div style="height: 60px; background: var(--p-color-text-info);"/>
      </Grid::Cell>
    </Grid>
  `,
  context: {
    columns: { xs: 1, sm: 4, md: 4, lg: 6, xl: 6 },
    areas: {
      xs: ['product', 'sales', 'orders'],
      sm: ['product product product product', 'sales sales orders orders'],
      md: ['sales product product orders'],
      lg: ['product product product product sales orders'],
      xl: ['product product sales sales orders orders'],
    },
    columnSpan: {
      xs: 6,
      sm: 2,
      md: 2,
      lg: 4,
      xl: 4,
    },
  },
});
