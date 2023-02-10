<template>
  <div>
    <n-alert title="嗨~ 你好" type="info" closable> 我刚才躲起来辣~ </n-alert>
    <n-el tag="span" style="color: var(--primary-color)"> 123 </n-el>

    <div class="fixed inset-0 z-50 bg-black bg-opacity-40">
      <div class="fixed w-10 h-10 bg-white rounded-full top-10 left-10"></div>
    </div>
  </div>
</template>

<script lang="ts" setup name="workplace"></script>
