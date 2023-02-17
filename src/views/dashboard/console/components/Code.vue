<template>
  <div class="mt-4">
    <n-card
      title="Tsx下directive使用演示"
      :segmented="{ content: true, footer: true }"
      size="small"
      :bordered="false"
    >
      <n-code :code="code" language="typescript" :show-line-numbers="true" />
    </n-card>
  </div>
</template>

<script setup lang="ts">
  const code = `import { defineComponent } from 'vue';
import { NAlert, NButton, NSpace } from 'naive-ui';
import { withDirectives, resolveDirective } from 'vue';

const WorkPlaceRoute = defineComponent({
  name: 'WorkPlaceRoute',
  setup() {
    const handlePressClick = () => {
      console.log('longpress click');
    };

    const renderLonePressButton = () => {
      const longPress = resolveDirective('press');
      return withDirectives(
        <NButton type="primary">
          <span>长按测试</span>
        </NButton>,
        [[longPress, handlePressClick, '500']]
      );
    };

    return () => (
      <div>
        <NAlert title="嗨 你好~" type="info" closable>
          我刚才躲起来辣~
        </NAlert>
        <div class="mt-3">
          <NSpace>
            {renderLonePressButton()}
          </NSpace>
        </div>
      </div>
    );
  },
});

export default WorkPlaceRoute;

  `;
</script>
