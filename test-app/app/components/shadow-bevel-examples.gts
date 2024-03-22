import {hash} from '@ember/helper';
import {ShadowBevel} from '@smile-io/ember-polaris/components/shadow-bevel';
import {Box} from '@smile-io/ember-polaris/components/box';

<template>

  <ShadowBevel @boxShadow="300" @borderRadius="300">
    <Box @background="bg-surface" @padding="400">
      Default
    </Box>
  </ShadowBevel>

  <ShadowBevel @boxShadow="300" @borderRadius="300" @bevel="{false}">
    <Box @background="bg-surface" @padding="400">
      With bevel: false
    </Box>
  </ShadowBevel>

  <ShadowBevel
    @boxShadow="300"
    @borderRadius="300"
    @bevel={{hash xs=false sm=true}}
  >
    <Box @background="bg-surface" @padding="400">
      With bevel: {'{xs: false, sm: true}'}
    </Box>
  </ShadowBevel>

  <ShadowBevel
    @boxShadow="300"
    @borderRadius="300"
    @bevel={{hash xs=false sm=true lg=false}}
  >
    <Box @background="bg-surface" @padding="400">
      With{' '} >bevel: {'{xs: false, sm: true, lg: false}'}
    </Box>
  </ShadowBevel>

  <ShadowBevel @as="article" @boxShadow="300" @borderRadius="300">
    <Box @background="bg-surface" @padding="400">
      With "as: article"
    </Box>
  </ShadowBevel>
</template>
