import Component from '@glimmer/component';

import '../styles/components/global.css';

const MAX_SCROLLBAR_WIDTH = 20;
const SCROLLBAR_TEST_ELEMENT_PARENT_SIZE = 30;
const SCROLLBAR_TEST_ELEMENT_CHILD_SIZE = SCROLLBAR_TEST_ELEMENT_PARENT_SIZE + 10;

function measureScrollbars() {
  const parentEl = document.createElement('div');
  parentEl.setAttribute(
    'style',
    `position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px; height:${SCROLLBAR_TEST_ELEMENT_PARENT_SIZE}px;`
  );

  const child = document.createElement('div');
  child.setAttribute(
    'style',
    `width:100%; height: ${SCROLLBAR_TEST_ELEMENT_CHILD_SIZE}; overflow:scroll; scrollbar-width: thin;`
  );
  parentEl.appendChild(child);
  document.body.appendChild(parentEl);

  const scrollbarWidth =
    SCROLLBAR_TEST_ELEMENT_PARENT_SIZE - (parentEl.firstElementChild?.clientWidth ?? 0);

  const scrollbarWidthWithSafetyHatch = Math.min(scrollbarWidth, MAX_SCROLLBAR_WIDTH);

  document.documentElement.style.setProperty(
    '--pc-app-provider-scrollbar-width',
    `${scrollbarWidthWithSafetyHatch}px`
  );

  document.body.removeChild(parentEl);
}

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

      const isSafari16 =
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome') &&
        (navigator.userAgent.includes('Version/16.1') ||
          navigator.userAgent.includes('Version/16.2') ||
          navigator.userAgent.includes('Version/16.3'));

      const isMobileApp16 =
        navigator.userAgent.includes('Shopify Mobile/iOS') &&
        (navigator.userAgent.includes('OS 16_1') ||
          navigator.userAgent.includes('OS 16_2') ||
          navigator.userAgent.includes('OS 16_3'));

      if (isSafari16 || isMobileApp16) {
        document.documentElement.classList.add('Polaris-Safari-16-Font-Optical-Sizing-Patch');
      }

      measureScrollbars();
    }
  }

  setBodyStyles() {
    document.body.style.backgroundColor = 'var(--p-color-bg)';
    document.body.style.color = 'var(--p-color-text)';
  }

  <template>{{yield}}</template>
}

export default AppProvider;
