<template>
  <div class="mt-4">
    <n-card
      title="学无止境"
      :segmented="{ content: true, footer: true }"
      size="small"
      :bordered="false"
    >
      <n-code :code="code" language="typescript" :show-line-numbers="true" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
  const code = `
import CssRender from 'css-render';
    
const { c } = CssRender();    
const style = c('body', ({ props }) => ({
  margin: 0,
  backgroundColor: props.backgroundColor
}), [
  c('&.dark', {
    backgroundColor: 'black'
  }),
  c('.container', {
    width: '100%'
  })
])
// in onMounted
style.mount()
// in onUnMounted
style.unmount()
// parse result
body {
  margin: 0;
  background-color: white;
}

body.dark {
  background-color: black;
}

body .container {
  width: 100%;
}
  `;
</script>
