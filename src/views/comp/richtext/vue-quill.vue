<template>
  <div>
    <div class="n-layout-page-header">
      <n-card :bordered="false" title="富文本">
        富文本，用于展示图文信息，比如商品详情，文章详情等...
      </n-card>
    </div>
    <n-card :bordered="false" class="mt-4 proCard">
      <QuillEditor
        ref="quillEditor"
        :options="options"
        v-model:content="myContent"
        style="height: 350px"
        @ready="readyQuill"
        class="quillEditor"
      />
      <template #footer>
        <n-space>
          <n-button @click="addText">增加文本</n-button>
          <n-button @click="addImg">增加图片</n-button>
          <n-button @click="getHtml">获取HTML</n-button>
        </n-space>
      </template>
    </n-card>
    <n-card :bordered="false" class="mt-4 proCard" title="HTML 内容">
      <n-input
        v-model:value="myContentHtml"
        type="textarea"
        placeholder="html"
        :autosize="{
          minRows: 3,
          maxRows: 6,
        }"
      />
    </n-card>
  </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  const quillEditor = ref();
  const myContent = ref('<h4>蘸霜色，描清秋~</h4>');
  const myContentHtml = ref('<h4>蘸霜色，描清秋~</h4>');

  const options = reactive({
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['image'],
      ],
    },
    theme: 'snow',
    placeholder: '输入您喜欢的内容吧！',
  });

  function readyQuill() {
    console.log('Quill准备好了');
  }

  function getHtml() {
    myContentHtml.value = getHtmlVal();
  }

  function addText() {
    const html = getHtmlVal() + '世间无限丹青手，何画离愁';
    quillEditor.value.setHTML(html);
  }

  function staticImage() {
    return 'data:image/png;base64,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';
  }

  function addImg() {
    const html = getHtmlVal() + `<img style="width:100px" src="${staticImage()}"/>`;
    quillEditor.value.setHTML(html);
  }

  function getHtmlVal() {
    return quillEditor.value.getHTML();
  }
</script>

<style lang="less">
  .ql-toolbar.ql-snow {
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid #eee;
    margin-top: -10px;
  }

  .ql-container.ql-snow {
    border: none;
  }
</style>
