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
          <span> 账户：{{ userStore.userName == '' ? "未知" : userStore.userName }}</span>
          <span> 账户角色：{{ userStore.roleName == '' ? "未知" : userStore.roleName }}</span>
        </div>
      </header-bar>
      <div class="tag-nav-wrap">
        <tag-nav :List="userRouteData.tagNavList" @input="handleTagClick" @on-close="handleTagClose" />
      </div>
      <div class="content-theme">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-slide" mode="out-in" appear>
            <keep-alive :include="userRouteData.aliveCachesList">
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
import Sider from './components/sider/index.vue'
import headerBar from './components/headerBar/index.vue'
import tagNav from './components/tagNav/index.vue'
import { useRouteStore } from '@/store/module/routeData'
import { useUserStore } from '@/store/module/user';
import { LOGIN_ROUTE_NAME } from '@/settings'
import { getBreadCrumbList, getHomeRoute, getRawRoute } from '@/libs/routeMethod'

const $route = useRoute()
const $router = useRouter()
const homeRoute = getHomeRoute($router.getRoutes())
const userRouteData = useRouteStore()
// slider
const menuList = userRouteData.menuList;
const collapsed = ref(false)
// header-bar
const handleCollpasedChange = (collapse: boolean) => {
  collapsed.value = collapse
}
const userStore = useUserStore()
const handleUserAction = (type: string) => {
  if (type === 'login-out') {
    userStore.handleLoginOut().then(() => {
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
  let nextName = userRouteData.getToRouteName(name)
  let Name = name || $route.name as string
  userRouteData.delNavTag(type, Name)
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
  userRouteData.addRouteViewData(getRawRoute($route), homeRoute)
}, { immediate: true, deep: false })

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
  background-color: @menu-dark-bg;
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
  background: #f5f7f9;
}

.role-box {
  margin-right: 15px;
}

.tag-nav-wrap {
  position: sticky;
  top: 64px;
  z-index: 100;
  background: #f5f7f9;
}

.content-theme {
  padding: 16px;
}
</style>