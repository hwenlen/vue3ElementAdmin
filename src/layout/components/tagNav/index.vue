<template>
  <div class="tag-nav">
    <div class="close-box">
      <el-dropdown @command="handleTagsOption">
        <el-button text :icon="CircleCloseFilled" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="close-all">关闭所有</el-dropdown-item>
            <el-dropdown-item command="close-other">关闭其他</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="btn-arrow left-btn">
      <el-button text :icon="CaretLeft" @click="handleScroll(240)" />
    </div>
    <div class="btn-arrow right-btn">
      <el-button text :icon="CaretRight" @click="handleScroll(-240)" />
    </div>
    <div class="scroll-outer" ref="scrollOuter" @DOMMouseScroll="handleWheelScroll" @mousewheel="handleWheelScroll">
      <div ref="scrollBody" class="scroll-body" :style="{ left: tagBodyLeft + 'px' }">
        <el-tag :effect="item.name == $route.name ? 'dark' : 'light'" :closable="item.name !== HOME_ROUTE_NAME"
          v-for="item in List" :key="(item.name as string)" @click="handleClick(item)"
          @close="handleClose(item.name as string)">
          {{ item.meta.title }}
        </el-tag>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
import { HOME_ROUTE_NAME } from '@/settings'
import { useRoute, RouteLocationNormalized } from 'vue-router'
import {
  CaretLeft,
  CaretRight,
  CircleCloseFilled
} from '@element-plus/icons-vue'
const $route = useRoute()

const Emits = defineEmits(['input', 'on-close']);
defineProps({
  List: {
    type: Array<RouteLocationNormalized>,
    default() {
      return []
    }
  }
})

let tagBodyLeft = ref(0)
let scrollOuter = ref()
let scrollBody = ref()
// 点击左右箭头
const handleScroll = (offset: number) => {
  if (offset > 0) {
    tagBodyLeft.value = Math.min(0, tagBodyLeft.value + offset)
  } else {
    if (scrollOuter.value.offsetWidth < scrollBody.value.offsetWidth) {
      if (tagBodyLeft.value < -(scrollBody.value.offsetWidth - scrollOuter.value.offsetWidth)) {
        tagBodyLeft.value = tagBodyLeft.value
      } else {
        tagBodyLeft.value = Math.max(tagBodyLeft.value + offset, scrollOuter.value.offsetWidth - scrollBody.value.offsetWidth)
      }
    } else {
      tagBodyLeft.value = 0
    }
  }
}
// 鼠标滚轮
const handleWheelScroll = (e: WheelEvent) => {
  var type = e.type
  let delta = 0
  if (type === 'DOMMouseScroll' || type === 'mousewheel') {
    delta = (e.deltaY) ? -e.deltaY : -(e.detail || 0) * 40
  }
  handleScroll(delta)
}
// 点击tag标签
const handleClick = (item: RouteLocationNormalized) => {
  Emits('input', item)
}
// 点击关闭tag标签
const handleClose = (name: string) => {
  Emits('on-close', 'single', name)
}

// 点击dropdown选项
const handleTagsOption = (type: string) => {
  if (type === 'close-all') {
    // 关闭所有，除了home
    Emits('on-close', 'all', '')
  } else {
    // 关闭除当前页和home页的其他页
    Emits('on-close', 'others', '')
  }
}
</script>
<style scoped lang='less'>
.tag-nav {
  position: relative;
  height: 40px;

  .close-box {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }

  :deep(.el-button) {
    height: 40px;
    padding: 8px 9px;
    border-radius: 0;
  }

  .btn-arrow {
    position: absolute;
    top: 0px;
    bottom: 0;
    background: #fff;
    z-index: 10;

    &.left-btn {
      left: 0;
    }

    &.right-btn {
      right: 32px;
      border-right: 1px solid #F0F0F0;
    }

    :deep(.ivu-btn-text:focus) {
      box-shadow: none;
    }
  }

  .scroll-outer {
    position: absolute;
    left: 32px;
    right: 61px;
    top: 0;
    bottom: 0;
    -webkit-box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
    box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
  }

  .scroll-body {
    height: calc(100% - 1px);
    display: inline-block;
    padding: 1px 4px 0;
    position: absolute;
    overflow: visible;
    white-space: nowrap;
    -webkit-transition: left .3s ease;
    transition: left .3s ease;

    :deep(.el-tag) {
      height: 32px;
      cursor: pointer;
      margin: 2px 4px 2px 0;
      border-radius: 2px;

      &.el-tag--light {
        background-color: #fff;
        border-color: #e8eaec;
        color: #515a6e;

        .el-icon {
          color: #666;

          &:hover {
            color: var(--el-tag-hover-color);
          }
        }
      }

      .el-icon:hover {
        background-color: transparent;
      }
    }
  }
}
</style>