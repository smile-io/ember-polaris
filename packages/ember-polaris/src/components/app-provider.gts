import Component from '@glimmer/component';

import '../../assets/styles.css';

export interface AppProviderSignature {
  Element: null;
  Args: void;
  Blocks: {
    default: [];
  };
}

export class AppProvider extends Component<AppProviderSignature> {
  constructor(owner: unknown, args: AppProviderSignature['Args']) {
    super(owner, args);

    if (document != null) {
      this.setBodyStyles();
    }
  }

  setBodyStyles() {
    document.body.style.backgroundColor = 'var(--p-background)';
    document.body.style.color = 'var(--p-text)';
  }

  <template>
    {{yield}}
  </template>
}

export default AppProvider;
