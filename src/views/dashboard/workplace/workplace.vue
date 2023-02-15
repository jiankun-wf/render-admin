<template>
  <div>
    <n-alert title="嗨 你好~" type="info" closable> 我刚才躲起来辣~ </n-alert>
    <div class="mt-4">
      <n-space>
        <n-button v-debounce:300.click="handleDebounceClick" type="primary">防抖测试</n-button>

        <n-button type="primary" v-throttle:500.click="handleThrottleClick">节流测试</n-button>

        <n-button type="primary" v-press:3000="handlePressClick">长按事件</n-button>
      </n-space>
    </div>
  </div>
</template>

<script lang="ts" setup name="workplace">
  const handleDebounceClick = () => {
    console.log('debounce click');
  };

  const handleThrottleClick = () => {
    console.log('throttle click');
  };

  const handlePressClick = () => {
    console.log('longpress click');
  };
</script>
