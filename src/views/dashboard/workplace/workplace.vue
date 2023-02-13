<template>
  <div>
    <n-alert title="嗨~ 你好" type="info" closable> 我刚才躲起来辣~ </n-alert>
    <span class="text-span">主体色测试</span>
  </div>
</template>

<script lang="ts" setup name="workplace"></script>

<style lang="less" scoped>
  .text-span {
    color: @primary-color;
  }
</style>
