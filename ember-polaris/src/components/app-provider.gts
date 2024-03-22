import Component from '@glimmer/component';

// TODO disabling this while to avoid conflicts with old Polaris which we use in parallel with this one for now.
// import '../styles/components/app-provider.scss';
import '../styles/components/global.scss';

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
    document.body.style.backgroundColor = 'var(--p-color-bg)';
    document.body.style.color = 'var(--p-color-text)';
  }

  <template>
    {{yield}}
  </template>
}

export default AppProvider;
