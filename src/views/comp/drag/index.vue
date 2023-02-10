<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="拖拽"> 来个小游戏 </n-card>
    </div>

    <n-alert title="你喜欢听歌吗？" type="warning" class="mt-4"> 帮我摆对吧！ </n-alert>

    <n-grid
      cols="1 s:2 m:3 l:4 xl:4 2xl:4"
      class="mt-4 proCard"
      responsive="screen"
      :x-gap="12"
      :y-gap="8"
    >
      <n-grid-item>
        <NCard
          title="周杰伦"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <Draggable
            class="draggable-ul"
            animation="300"
            :list="demandList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag :type="getTagType(element, 'jl')">{{ getTagText(element, 'jl') }}</n-tag
                ><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>

      <n-grid-item>
        <NCard
          title="陈奕迅"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <Draggable
            class="draggable-ul"
            animation="300"
            :list="exploitList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag :type="getTagType(element, 'cyx')">{{ getTagText(element, 'cyx') }}</n-tag
                ><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>

      <n-grid-item>
        <NCard
          title="周传雄"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <Draggable
            class="draggable-ul"
            animation="300"
            :list="completeList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag :type="getTagType(element, 'zcx')">{{ getTagText(element, 'zcx') }}</n-tag
                ><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>

      <n-grid-item>
        <NCard
          title="五月天"
          :segmented="{ content: true, footer: true }"
          size="small"
          :bordered="false"
        >
          <Draggable
            class="draggable-ul"
            animation="300"
            :list="approvedList"
            group="people"
            itemKey="name"
          >
            <template #item="{ element }">
              <div class="cursor-move draggable-li">
                <n-tag :type="getTagType(element, 'wyt')">{{ getTagText(element, 'wyt') }}</n-tag
                ><span class="ml-2">{{ element.name }}</span>
              </div>
            </template>
          </Draggable>
        </NCard>
      </n-grid-item>
    </n-grid>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import Draggable from 'vuedraggable';

  const demandList = reactive([
    { name: '快使用 _ _ _ ~', id: 'jl' },
    { name: '天青色等烟雨，而我 _ _ _ ', id: 'jl' },
    { name: '谁说站在 _ 里的才算 _ _！', id: 'cyx' },
    { name: '得不到的永远在 _ _ ~', id: 'cyx' },
    { name: '请用心听, _ _ _ _', id: 'cyx' },
    { name: '紧紧握着 _ _ 信物，厮守着承诺', id: 'zcx' },
    { name: '当记忆的心缠绕过往 _ _ _ _ ', id: 'zcx' },
    { name: '我是 _ _ 上了 _ 的一扇 _ ', id: 'zcx' },
  ]);

  const exploitList = reactive([{ name: '像 _ _ 依赖着 _ _ ，像 _ _ 依赖着 _ _ ', id: 'wyt' }]);

  const completeList = reactive([{ name: '会不会有一天，时间真的有 _ _ ', id: 'wyt' }]);

  const approvedList = reactive([{ name: '你不是真正的 _ _ ', id: 'wyt' }]);

  const isBelongSinger = (element: { id: string }, singer: string) => {
    return element.id === singer;
  };

  const getTagType = (element: { id: string }, singer: string) => {
    return isBelongSinger(element, singer) ? 'success' : 'error';
  };

  const getTagText = (element: { id: string }, singer: string) => {
    return isBelongSinger(element, singer) ? '对了' : '错了';
  };
</script>

<style lang="less" scoped>
  .draggable-ul {
    width: 100%;
    overflow: hidden;
    margin-top: -16px;

    .draggable-li {
      width: 100%;
      padding: 16px 10px;
      color: @primaryColor;
      border-bottom: 1px solid #efeff5;
    }
  }
</style>
