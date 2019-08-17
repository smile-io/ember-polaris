function createRegistryPlugin() {
  return class AutoWrapperPlugin {
    transform(ast) {
      let plugin = createGlimmerPlugin(this);
      this.syntax.traverse(ast, plugin.visitor);

      return ast;
    }
  };
}

const createGlimmerPlugin = (glimmer) => {
  const b = glimmer.syntax.builders;

  const AUTO_WRAPPERS = [
    'polaris-stack',
    'PolarisStack',
    'polaris-form-layout',
    'PolarisFormLayout',
    'polaris-button-group',
    'PolarisButtonGroup',
  ];

  /**
   * We don't really care about conflicts with other block param names,
   * since it shouldn't matter for our auto-wrapped components
   */
  const tagNameFromComponentName = (node) => {
    if (node.type === 'BlockStatement') {
      const name = node.path.original;
      return name
        .replace('polaris-', '')
        .replace(/-\S/g, (s) => s.slice(1).toUpperCase());
    } else if (node.type === 'ElementNode') {
      const name = node.tag.replace('Polaris', '');
      return `${name[0].toLowerCase()}${name.slice(1)}`;
    } else {
      throw error(`can't generate tagName from ${node.type}`, node);
    }
  };

  const wrapNode = (node, tag) => {
    const blockParam = tag.split('.')[0];
    // If it's already wrapped or it's just a TextNode, we're done
    if (
      (node.type === 'ElementNode' && node.tag.includes(blockParam)) ||
      (['BlockStatement', 'MustacheStatement'].includes(node.type) &&
        node.path.original.includes(blockParam)) ||
      node.type === 'TextNode'
    ) {
      return node;
    }

    // If it's a let/with block
    if (
      node.type === 'BlockStatement' &&
      ['let', 'with'].includes(node.path.original)
    ) {
      node.program.body = node.program.body.map((n) => wrapNode(n, tag));

      return node;
    }

    if (
      node.type === 'BlockStatement' &&
      ['if', 'unless', 'each'].includes(node.path.original)
    ) {
      node.program.body = [b.element(tag, [], [], node.program.body)];

      if (node.inverse) {
        node.inverse.body = [b.element(tag, [], [], node.inverse.body)];
      }

      return node;
    }

    if (
      ['ElementNode', 'MustacheStatement', 'BlockStatement'].includes(node.type)
    ) {
      return b.element(tag, [], [], [node]);
    }

    // Ignore comments
    if (node.type === 'MustacheCommentStatement') {
      return node;
    }

    throw error("can't wrap node", node);
  };

  const setBlockParam = (node, blockParam) => {
    if (node.type === 'BlockStatement') {
      node.program.blockParams.push(blockParam);
    } else if (node.type === 'ElementNode') {
      node.blockParams.push(blockParam);
    }
  };

  const wrapChildrenIfNeeded = (node) => {
    if (!shouldProcessNode(node)) {
      return;
    }

    let blockParam = node.program
      ? node.program.blockParams[0]
      : node.blockParams[0];
    if (!blockParam) {
      blockParam = tagNameFromComponentName(node);
      setBlockParam(node, blockParam);
    }

    if (node.type === 'BlockStatement') {
      node.program.body = node.program.body.map((childNode) =>
        wrapNode(childNode, `${blockParam}.item`)
      );
    } else if (node.type === 'ElementNode') {
      node.children = node.children.map((childNode) =>
        wrapNode(childNode, `${blockParam}.item`)
      );
    } else {
      throw error(`can't wrap node of type ${node.type}`);
    }
  };

  const shouldProcessNode = (node) => {
    return (
      (node.type === 'BlockStatement' &&
        AUTO_WRAPPERS.indexOf(node.path.original) !== -1) ||
      (node.type === 'ElementNode' && AUTO_WRAPPERS.indexOf(node.tag) !== -1)
    );
  };

  const error = (reason, node) => {
    let message = `[ember-polaris] AutoWrapper ${reason}`;

    if (node.loc && node.loc.source !== '(synthetic)' && node.loc.start) {
      let { line, column } = node.loc.start;

      if (line !== undefined && column !== undefined) {
        message += ` (on line ${line} column ${column})`;
      } else if (line !== undefined) {
        message += ` (on line ${line})`;
      }
    }

    return new Error(message);
  };

  return {
    visitor: {
      BlockStatement: {
        enter(node) {
          wrapChildrenIfNeeded(node);
        },
      },
      ElementNode: {
        enter(node) {
          wrapChildrenIfNeeded(node);
        },
      },
    },
  };
};

module.exports = { createRegistryPlugin };
