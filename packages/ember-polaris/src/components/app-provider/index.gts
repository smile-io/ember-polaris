import Component from '@glimmer/component';

// TODO disabled during WIP on this library to avoid conflicts with old Polaris which we use in parallel for now.
// import './app-provider.scss';
import './global.scss';

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
