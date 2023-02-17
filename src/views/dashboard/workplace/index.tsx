import { defineComponent } from 'vue';
import { NAlert, NButton, NSpace } from 'naive-ui';
import { withDirectives, resolveDirective } from 'vue';

const WorkPlaceRoute = defineComponent({
  name: 'WorkPlaceRoute',
  setup() {
    const handleDebounceClick = () => {
      console.log('debounce click');
    };

    const handleThrottleClick = () => {
      console.log('throttle click');
    };

    const handlePressClick = () => {
      console.log('longpress click');
    };

    const renderDebounceButton = () => {
      const debounce = resolveDirective('debounce');

      return withDirectives(
        <NButton type="primary">
          <span>防抖测试</span>
        </NButton>,
        [[debounce, handleDebounceClick, '300', { click: true }]]
      );
    };

    const renderThrottleButton = () => {
      const throttle = resolveDirective('throttle');

      return withDirectives(
        <NButton type="primary">
          <span>节流测试</span>
        </NButton>,
        [[throttle, handleThrottleClick, '500', { click: true }]]
      );
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
            {renderDebounceButton()}
            {renderThrottleButton()}
            {renderLonePressButton()}
          </NSpace>
        </div>
      </div>
    );
  },
});

export default WorkPlaceRoute;
