<template>
  <div class="mt-4">
    <n-grid cols="1 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen" :x-gap="12" :y-gap="8">
      <n-grid-item v-for="item in equations" :key="item.id">
        <n-card
          content-style="display: flex; align-items: center;"
          :bordered="false"
          style="height: 100%"
        >
          <n-equation :value="item.value" :katex-options="item.options" />
        </n-card>
      </n-grid-item>
    </n-grid>
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { equations } from './equation';

  export default defineComponent({
    setup() {
      return {
        equations,
      };
    },
  });
</script>
