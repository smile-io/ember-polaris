export function setUpAttributeCaptureOnComponent(
  testContext,
  componentPath,
  componentClass,
  attributeName
) {
  testContext.owner.register(
    `component:${componentPath}`,
    componentClass.extend({
      didReceiveAttrs() {
        this._super(...arguments);

        testContext.set(attributeName, this.get(attributeName));
      },
    })
  );
}
