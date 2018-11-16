const breakpoints = {
  navBarCollapsed: '769px',
  stackedContent: '1043px',
};

const noWindowMatches = {
  media: '',
  addListener() {},
  removeListener() {},
  matches: false,
};

export function stackedContent() {
  return typeof window === 'undefined'
    ? noWindowMatches
    : window.matchMedia(`(max-width: ${breakpoints.stackedContent})`);
}
