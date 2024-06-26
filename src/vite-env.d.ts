/// <reference types="vite/client" />
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}

declare module "element-plus/dist/locale/zh-cn.mjs";
declare module '@wangeditor/editor-for-vue';
