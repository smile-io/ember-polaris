// Easily allow apps, which are not yet using strict mode templates, to consume your Glint types, by importing this file.
// Add all your components, helpers and modifiers to the template registry here, so apps don't have to do this.
// See https://typed-ember.gitbook.io/glint/environments/ember/authoring-addons

import type { AppProvider } from './components/app-provider';
import type { Box } from './components/box';
import type { Grid } from './components/grid';
import type { ShadowBevel } from './components/shadow-bevel';
import type { Text } from './components/text';

export default interface Registry {
  AppProvider: typeof AppProvider;
  Box: typeof Box;
  Grid: typeof Grid;
  ShadowBevel: typeof ShadowBevel;
  Text: typeof Text;
}
