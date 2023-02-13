<template>
  <div>
    <n-alert title="嗨 你好~" type="info" closable> 我刚才躲起来辣~ </n-alert>
    <div class="mt-4">
      <n-button v-debounce:1000="handleClick" type="primary">主体色测试</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup name="workplace">
  const handleClick = () => {
    console.log('click');
  };
</script>
