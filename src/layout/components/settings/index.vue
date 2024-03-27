<template>
  <el-drawer class="drawer-settings" v-model="visible" :with-header="false" size="300" @close="close">
    <h3 class="drawer-title">项目配置</h3>
    <el-divider>主题</el-divider>

    <div class="disflex justify-center" @click.stop>
      <el-switch v-model="isDark" inline-prompt :active-icon="Moon" :inactive-icon="Sunny"
        style="--el-switch-on-color: var(--el-fill-color-dark); --el-switch-off-color: var(--el-color-primary)"
        @change="toggleDark" />
    </div>
  </el-drawer>
</template>
<script lang='ts' setup>
import { ref, watch } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import { useDark, useToggle } from "@vueuse/core";

let Props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  }
})

const Emits = defineEmits(['update:modelValue'])
const close = () => {
  Emits('update:modelValue', false)
}

// 通过监听modelValue值的变化进行一些组件内的操作
const visible = ref(false)
watch(
  () => Props.modelValue,
  (val) => {
    visible.value = val
  },
  { immediate: true }
)

// 暗黑模式开关
const isDark = useDark()
const toggleDark = () => useToggle(isDark)
</script>