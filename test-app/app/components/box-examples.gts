import {Box} from '@smile-io/ember-polaris/components/box';
import {Text} from '@smile-io/ember-polaris/components/text';

<template>
  <Box
    @background="bg-surface"
    @padding="400"
    @borderWidth="025"
    @borderColor="border"
  >
    <Text @as="p">1px solid border</Text>
  </Box>
  <Box
    @background="bg-surface"
    @padding="400"
    @borderWidth="025"
    @borderStyle="dashed"
    @borderColor="border-secondary"
  >
    <Text @as="p">1px dashed border</Text>
  </Box>
  <Box
    @background="bg-surface"
    @padding="400"
    @borderWidth="050"
    @borderColor="border-info"
  >
    <Text @as="p">2px solid blue</Text>
  </Box>
  <Box
    @background="bg-surface"
    @padding="400"
    @borderWidth="100"
    @borderColor="border-caution"
  >
    <Text @as="p">4px solid yellow</Text>
  </Box>
  <Box
    @background="bg-surface"
    @padding="400"
    @borderBlockStartWidth="100"
    @borderColor="border-critical"
  >
    <Text @as="p">border-block-start: 4px solid red</Text>
  </Box>
  <Box
    @background="bg-surface"
    @padding="400"
    @borderWidth="100"
    @borderBlockStartWidth="025"
    @borderColor="border-critical"
  >
    <Text @as="p">border-width: 4px solid red</Text>
    <Text @as="p">border-block-start: 1px solid red</Text>
    <Box
      @background="bg-surface"
      @padding="400"
      @borderWidth="100"
      @borderColor="border-caution"
    >
      <Text @as="p">border-width: 4px solid yellow</Text>
      <Text @as="p" fontWeight="semibold">
        Note: border-block-start will not inherit from the parent Box component
      </Text>
    </Box>
  </Box>
  <Box
    @background="bg-surface"
    @padding="400"
    @borderWidth="100"
    @borderColor="transparent"
  >
    <Text @as="p">4px solid transparent</Text>
  </Box>
</template>
