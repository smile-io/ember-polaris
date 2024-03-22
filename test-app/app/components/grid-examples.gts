import {hash,array} from '@ember/helper';
import {Grid} from '@smile-io/ember-polaris/components/grid';
import {Cell as GridCell} from '@smile-io/ember-polaris/components/grid/cell';

<template>
  <Grid @columns={{hash sm=3}}>
    <GridCell @columnSpan={{hash xs=6 sm=4 md=4 lg=8 xl=8}}>
      <p>View a summary of your online store’s sales.</p>
    </GridCell>
    <GridCell @columnSpan={{hash xs=6 sm=2 md=2 lg=4 xl=4}}>
      <p>View a summary of your online store’s orders.</p>
    </GridCell>
  </Grid>

  <Grid>
    <GridCell @columnSpan={{hash xs=6 sm=2 md=2 lg=4 xl=4}}>
      <p>View a summary of your online store’s sales.</p>
    </GridCell>
    <GridCell @columnSpan={{hash xs=6 sm=2 md=2 lg=4 xl=4}}>
      <p>View a summary of your online store’s orders.</p>
    </GridCell>
    <GridCell @columnSpan={{hash xs=6 sm=2 md=2 lg=4 xl=4}}>
      <p>View a summary of your online store’s orders.</p>
    </GridCell>
  </Grid>

  <Grid
    @columns={{hash xs=1 sm=4 md=4 lg=6 xl=6}}
    @areas={{hash
      xs=(array "product" "sales" "orders")
      sm=(array "product product product product" "sales sales orders orders")
      md=(array "sales product product orders")
      lg=(array "product product product product sales orders")
      xl=(array "product product sales sales orders orders")
    }}
  >
    <GridCell @area="product">
      {{! template-lint-disable no-inline-styles }}
      <div style="height: 60px; background: aquamarine"></div>
    </GridCell>
    <GridCell @area="sales">
      {{! template-lint-disable no-inline-styles }}
      <div style="height: 60px; background: aquamarine"></div>
    </GridCell>
    <GridCell @area="orders">
      {{! template-lint-disable no-inline-styles }}
      <div style="height: 60px; background: aquamarine;"></div>
    </GridCell>
  </Grid>
</template>
