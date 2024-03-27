<template>
  <div class="main">
    <div class="scroll-slide" :class="{ 'menu-collapse': collapsed }">
      <Sider :collapsed="collapsed" :menu-list="menuList" :route-data="$route">
        <div class="logo">
          <p v-if="!collapsed">欢迎登录</p>
        </div>
      </Sider>
    </div>
    <div class="content-wrapper">
      <header-bar :collapsed="collapsed" :breadcrumb="breadcrumbData" @handleCollpasedChange="handleCollpasedChange"
        @handleUserAction="handleUserAction">
        <div class="role-box">
          <span> 账户：{{ userName == '' ? "未知" : userName }}</span>
          <span> 账户角色：{{ roleName == '' ? "未知" : roleName }}</span>
        </div>
      </header-bar>
      <div class="tag-nav-wrap">
        <tag-nav :List="tagNavStore.tagNavList" @input="handleTagClick" @on-close="handleTagClose"
          @open-setting="openSetting" />
      </div>
      <settings v-model="isOpenSetting" />
      <div class="content-theme">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-slide" mode="out-in" appear>
            <keep-alive :include="tagNavStore.aliveCachesList">
              <component :is="Component" :key="route.fullPath" />
            </keep-alive>
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, Ref, watch } from 'vue'
import { useRoute, useRouter, RouteLocationNormalized, RouteLocationMatched } from 'vue-router'
import { Sider, headerBar, tagNav, settings } from './components'
import { useTagNavStore } from '@/store/module/tagNavStore'
import { useUserStore } from '@/store/module/userStore';
import { LOGIN_ROUTE_NAME } from '@/settings'
import { getBreadCrumbList, getHomeRoute, getRawRoute } from '@/libs/routeMethod'
import { storeToRefs } from 'pinia'

const $route = useRoute()
const $router = useRouter()
const homeRoute = getHomeRoute($router.getRoutes())
const tagNavStore = useTagNavStore()
const userStore = useUserStore()
// slider
const menuList = userStore.menuList;
const collapsed = ref(false)
// header-bar
const handleCollpasedChange = (collapse: boolean) => {
  collapsed.value = collapse
}
const handleLoginOut = userStore.handleLoginOut
const { userName, roleName } = storeToRefs(userStore)
// 退出登录
const handleUserAction = (type: string) => {
  if (type === 'login-out') {
    handleLoginOut().then(() => {
      $router.push({
        name: LOGIN_ROUTE_NAME
      })
    })
  }
}

// tagNav
const handleTagClick = (item: RouteLocationNormalized) => {
  $router.push({
    path: item.fullPath || item.path
  })
}

const handleTagClose = (type: string, name: string) => {
  let nextName = tagNavStore.getToRouteName(name)
  let Name = name || $route.name as string
  tagNavStore.delNavTag(type, Name)
  if (type == 'all') {
    $router.push({
      path: '/'
    })
  } else if (type == 'single' && name === $route.name) {
    $router.push({
      name: nextName
    })
  }
}

// 面包屑breadcrumb
const breadcrumbData: Ref<RouteLocationMatched[]> = ref([])
watch($route, () => {
  breadcrumbData.value = getBreadCrumbList($route.matched, homeRoute)
  tagNavStore.addRouteViewData(getRawRoute($route), homeRoute)
}, { immediate: true, deep: false })

// 打开设置抽屉
const isOpenSetting = ref(false)
const openSetting = (open: boolean) => {
  isOpenSetting.value = open
}

</script>
<style scoped lang='less'>
.main {
  height: 100vh;
  display: flex;
  overflow-y: auto;
}

.scroll-slide {
  min-width: 220px;
  flex-shrink: 0;
  height: 100%;
  background-color: var(--el-menu-bg-color);
  overflow-y: auto;
  overflow-x: hidden;
  transition: all 0.4s;

  &.menu-collapse {
    min-width: 0;
  }
}

.logo {
  color: #fff;
  line-height: 64px;
  height: 64px;
  font-size: 16px;
  text-align: center;
}

.content-wrapper {
  overflow-x: hidden;
  min-width: 1200px;
  flex: 1;
  width: 0;
  background: var(--el-bg-color-page);
}

.role-box {
  margin-right: 15px;
}

.tag-nav-wrap {
  position: sticky;
  top: 64px;
  z-index: 100;
  background: var(--el-bg-color-page);
}

.content-theme {
  padding: 16px;
}
</style>@/store/module/tagNavStore