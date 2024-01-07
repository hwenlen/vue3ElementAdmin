<template>
  <div class="slide-menu-wrap">
    <slot></slot>
    <el-menu router unique-opened :default-active="routeData.path" :collapse="collapsed" active-text-color="#fff"
      background-color="@menu-dark-bg" text-color="rgba(255,255,255,.7)">
      <template v-for="item in menuList" :key="item.name">
        <!-- 有子路由且大于一个 -->
        <template v-if="item.children && item.children.length > 1">
          <el-sub-menu :index="item.path" popper-class="slide-menu-poper">
            <template #title>
              <el-icon>
                <component :is="item.meta.icon"></component>
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item :index="setRouteFullPath(item.path, child.path)" v-for="child in item.children"
                :key="child.name">
                <el-icon>
                  <component :is="child.meta.icon"></component>
                </el-icon>{{ child.meta.title }}
              </el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </template>
        <!-- 有子路由且只有一个 -->
        <template v-if="item.children && item.children.length == 1">
          <el-menu-item :index="setRouteFullPath(item.path, item.children[0].path)">
            <el-icon>
              <component :is="item.children[0].meta.icon"></component>
            </el-icon>
            <template #title>{{ item.children[0].meta.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang='ts' setup>
import { setRouteFullPath } from '@/libs/routeMethod'
defineProps({
  menuList: {
    type: Object,
    default() {
      return {}
    }
  },
  routeData: {
    type: Object,
    default() {
      return {}
    }
  },
  collapsed: {
    type: Boolean,
    default() {
      return false
    }
  }
})
</script>
<style scoped lang='less'>
.slide-menu-wrap {
  width: 100%;
  background-color: @menu-dark-bg;
  height: 100%;

  :deep(.el-menu) {
    border-right: none;
  }

  :deep(.el-sub-menu.is-opened) {
    .el-sub-menu__title {
      color: #fff;
    }
  }

  :deep(.el-sub-menu__title:hover) {
    background-color: @menu-dark-bg;
    color: #fff;
  }

  :deep(.el-menu-item) {
    &:hover {
      background-color: @menu-dark-active-bg;
      color: #fff;
    }

  }

  :deep(.el-menu-item-group) {
    background-color: @menu-dark-active-bg;
  }
}
</style>

<style lang="less">
.slide-menu-poper {
  background: @menu-dark-bg;
  border: none;

  .el-menu-item-group__title {
    display: none;
  }

  .el-menu-item:hover {
    background: @menu-dark-bg;
    color: #fff;
  }
}
</style>