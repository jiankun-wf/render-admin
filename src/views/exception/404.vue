<template>
  <div class="flex flex-col justify-center page-container">
    <div class="text-center">
      <img class="w-1/2 mx-auto" src="~@/assets/images/exception/404.gif" alt="" />
    </div>
    <div class="mt-10 text-center">
      <n-button type="primary" @click="goHome">回到首页</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  const { push } = useRouter();
  function goHome() {
    push('/');
  }
</script>

<style lang="less" scoped>
  .page-container {
    width: 100%;
    border-radius: 4px;
    padding: 75px 0;

    .text-center {
      h1 {
        color: #666;
        padding: 20px 0;
      }
    }
  }
</style>
