<template>
  <div class="has-logo">
    <logo />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- 左侧菜单组件 -->
      <el-menu
        :default-active="activeMenu"
        mode="vertical"
        :collapse-transition="false"
        :unique-opened="true"
      >
        <!-- 菜单中的每一项 -->
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem, Logo },
  computed: {
    routes() {
      // this.$router.options.routes创建路由对象时传入的路由规则
      // 左侧彩电的渲染是通过this.$router.options.routes 来进行渲染的
      // 权限标识 只需要给 this.$router.options.routes 进行对比
      // this.$router.options.routes 是创建路由对象时传入的路由规则
      // 权限标识跟 路由规则进行对比
      // this.$router.options.routes 不是响应式
      // 只能取创建路由对象时传入的路由规则，后续通过addRoute添加的路由 是获取不到的
      // return this.$router.options.routes
      // 需要使用Vuex中的数据 是响应式
      return this.$store.state.menu.menuList
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }
  }
}
</script>

