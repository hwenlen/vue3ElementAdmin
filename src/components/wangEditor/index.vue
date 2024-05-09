<template>
  <div style="border: 1px solid #ccc">
    <Toolbar style="border-bottom: 1px solid #ccc" mode="default" :editor="editorRef" :defaultConfig="toolbarConfig" />
    <Editor style="height: 380px; overflow-y: hidden" v-model="valueHtml" :defaultConfig="editorConfig"
      @onCreated="handleCreated" @onChange="handleChange" mode="default" />
  </div>
</template>
<script lang='ts' setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import { onBeforeUnmount, ref, shallowRef, watch } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { IEditorConfig, IDomEditor } from '@wangeditor/editor'

const Props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

// 内容 HTML
const valueHtml = ref("");

const toolbarConfig = {};

// 初始化 MENU_CONF 属性
const editorConfig: Partial<IEditorConfig> = {  // TS 语法
  MENU_CONF: {
    uploadImage: {
      fieldName: 'image',
      server: '/v1_0/upload',
      withCredentials: true
    }
  },
  placeholder: "请输入内容..."
}

watch(
  () => Props.modelValue,
  (val) => {
    valueHtml.value = val
  }
)

const Emits = defineEmits(['update:modelValue', 'confirm'])

const handleChange = () => {   // TS 语法
  Emits('update:modelValue', valueHtml.value)
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};


</script>