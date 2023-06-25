import { defineComponent, onMounted } from 'vue';
import { NAlert, NButton, NSpace } from 'naive-ui';
import { withDirectives, resolveDirective } from 'vue';
import { formatToDateTime } from '@/utils/dateUtil';
import { useMessage } from 'naive-ui';

const WorkPlaceRoute = defineComponent({
  name: 'WorkPlaceRoute',
  setup() {
    const message = useMessage();
    const handleDebounceClick = () => {
      message.success('debounce click');
    };

    const handleThrottleClick = () => {
      message.success('throttle click');
    };

    const handlePressClick = () => {
      message.success('longpress click');
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
        [[throttle, handleThrottleClick, '1000', { click: true }]] // v-throttle:1000.click="handleThrottleClick"
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

    onMounted(() => {
      console.log(formatToDateTime(Date.now()));
    });

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
