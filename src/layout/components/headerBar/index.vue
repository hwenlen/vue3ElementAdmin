<template>
  <header class="page-header">
    <div class="header-left">
      <div class="sider-tigger" @click="handleCollpasedChange">
        <el-icon size="22" v-if="collapsed">
          <Expand />
        </el-icon>
        <el-icon size="22" v-else>
          <Fold />
        </el-icon>
      </div>
      <div class="custom-bread-crumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="item in breadcrumb" :key="item.path"
            :to="item.name == HOME_ROUTE_NAME ? item.path : ''">
            <el-icon :size="18">
              <component :is="item.meta.icon"></component>
            </el-icon>
            {{ item.meta.title }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
    <div class="header-right">
      <slot></slot>
      <el-dropdown @command="handleUserAction">
        <el-avatar :size="36" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="login-out">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>
<script lang='ts' setup>
import { RouteLocationMatched } from 'vue-router';
import { HOME_ROUTE_NAME } from '@/settings'
const Props = defineProps<{
  collapsed: boolean,
  breadcrumb: RouteLocationMatched[]
}>()

const Emits = defineEmits(['handleCollpasedChange', 'handleUserAction'])

const handleCollpasedChange = () => {
  Emits('handleCollpasedChange', !Props.collapsed)
}

const handleUserAction = (type: string) => {
  Emits('handleUserAction', type)
}
</script>
<style scoped lang='less'>
.page-header {
  width: 100%;
  height: 64px;
  line-height: 64px;
  background: #FFF;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 99;
  display: flex;
  justify-content: space-between;

  .header-left {
    display: flex;
    align-items: center;
  }

  .header-right {
    padding-right: 20px;
    display: flex;
    align-items: center;

    :deep(.el-avatar:focus-visible) {
      outline: none;
    }
  }

  .sider-tigger {
    cursor: pointer;

    i {
      display: block;
    }
  }

  .custom-bread-crumb {
    margin-left: 10px;

    :deep(.el-breadcrumb__inner) {
      display: flex;
      align-items: center;

      .el-icon {
        display: block;
      }
    }
  }
}
</style>