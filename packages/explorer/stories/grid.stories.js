import { hbs } from 'ember-cli-htmlbars';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Grid',
  parameters: {
    options: {
      showPanel: true,
      isToolshown: true,
      selectedPanel: 'storybook/actions/panel',
    },
  },
};

// export default {
//   component: Grid,
// } as ComponentMeta<typeof Grid>;
//
export const TwoColumn = () => ({
  template: `hbs
<Grid>
  <Grid::Cell @columnSpan={{hash xs=6 sm=3 md=3 lg=6 xl=6}}>
    <h1>Sales</h1>
    <p>View a summary of your online store’s sales.< /p>
  </Grid::Cell>

  <Grid::Cell @columnSpan={{hash xs=6 sm=3 md=3 lg=6 xl=6}}>
    <h1>Orders</h1>
    <p>View a summary of your online store’s sales.< /p>
  </Grid::Cell>
</Grid>
`,
});

export const Button = () => ({
  template: hbs`<button {{on "click" this.onClick}}>Click Me</button>`,
  context: {
    onClick: action('clicked'),
  },
});
//   return (V
//     <Page fullWidth >
//     <Grid>
//     <Grid.Cell columnSpan= {{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 } }>
//   <LegacyCard title="Sales" sectioned >
//     <p>View a summary of your online store’s sales.< /p>
//       < /LegacyCard>
//       < /Grid.Cell>
//       < Grid.Cell columnSpan = {{ xs: 6, sm: 3, md: 3, lg: 6, xl: 6 }}>
//         <LegacyCard title="Orders" sectioned >
//           <p>View a summary of your online store’s orders.< /p>
//             < /LegacyCard>
//             < /Grid.Cell>
//             < /Grid>
//             < /Page>
//   );
// }
//
// export function TwoThirdsAndOneThirdColumn() {
//   return (
//     <Page fullWidth >
//     <Grid columns= {{ sm: 3 }
// }>
//   <Grid.Cell columnSpan={ { xs: 6, sm: 4, md: 4, lg: 8, xl: 8 } }>
//     <LegacyCard title="Sales" sectioned >
//       <p>View a summary of your online store’s sales.< /p>
//         < /LegacyCard>
//         < /Grid.Cell>
//         < Grid.Cell columnSpan = {{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
//           <LegacyCard title="Orders" sectioned >
//             <p>View a summary of your online store’s orders.< /p>
//               < /LegacyCard>
//               < /Grid.Cell>
//               < /Grid>
//               < /Page>
//   );
// }
//
// export function ThreeOneThirdColumn() {
//   return (
//     <Page fullWidth >
//     <Grid>
//     <Grid.Cell columnSpan= {{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }
// }>
//   <LegacyCard title="Sales" sectioned >
//     <p>View a summary of your online store’s sales.< /p>
//       < /LegacyCard>
//       < /Grid.Cell>
//       < Grid.Cell columnSpan = {{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
//         <LegacyCard title="Orders" sectioned >
//           <p>View a summary of your online store’s orders.< /p>
//             < /LegacyCard>
//             < /Grid.Cell>
//             < Grid.Cell columnSpan = {{ xs: 6, sm: 2, md: 2, lg: 4, xl: 4 }}>
//               <LegacyCard title="Orders" sectioned >
//                 <p>View a summary of your online store’s orders.< /p>
//                   < /LegacyCard>
//                   < /Grid.Cell>
//                   < /Grid>
//                   < /Page>
//   );
// }
//
// export function CustomLayout() {
//   return (
//     <Page fullWidth >
//     <LegacyCard sectioned >
//     <Grid
//           columns= {{ xs: 1, sm: 4, md: 4, lg: 6, xl: 6 }
// }
// areas = {{
//   xs: ['product', 'sales', 'orders'],
//     sm: [
//       'product product product product',
//       'sales sales orders orders',
//     ],
//       md: ['sales product product orders'],
//         lg: ['product product product product sales orders'],
//           xl: ['product product sales sales orders orders'],
//           }}
//         >
//   <Grid.Cell area="product" >
//     <div
//               style={
//   {
//     height: '60px',
//       background: 'var(--p-color-text-info)',
//               }
// }
// />
//   < /Grid.Cell>
//   < Grid.Cell area = "sales" >
//     <div
//               style={
//   {
//     height: '60px',
//       background: 'var(--p-color-text-info)',
//               }
// }
// />
//   < /Grid.Cell>
//   < Grid.Cell area = "orders" >
//     <div
//               style={
//   {
//     height: '60px',
//       background: 'var(--p-color-text-info)',
//               }
// }
// />
//   < /Grid.Cell>
//   < /Grid>
//   < /LegacyCard>
//   < /Page>
//   );
// }
