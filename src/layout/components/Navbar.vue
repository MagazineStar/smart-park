<template>
  <div class="navbar">
    <div class="right-menu">
      <el-button class="avatar-btn" type="primary" round @click="$router.push('/bigscreen')">可视化大屏</el-button>
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <!-- 用户名称 -->
          <span class="name">MagazineStar</span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <router-link to="/">
            <el-dropdown-item> 首页 </el-dropdown-item>
          </router-link>
          <a target="_blank">
            <el-dropdown-item> 项目地址 </el-dropdown-item>
          </a>
          <!-- 组件不能绑定原生事件 -->
          <!-- <el-button @click="handleClick">按钮</el-button> -->
          <!-- el-button 能够绑定click事件的原因: el-button内部 实现了 this.$emit('click') -->
          <!-- el-dropdown-item 不能够绑定click事件的原因: el-button内部 没实现了 this.$emit('click') -->
          <!-- 解决给组件绑定原生事件的方法： @click.native 加上.native就可以绑定原生事件 -->
          <!-- 使用完 .native后 实际上这个原生事件是绑定给了 组件内部外层元素 -->
          <!-- 如何判断什么时候加 .native: 试一下 -->
          <el-dropdown-item divided @click.native="logout">
            <span style="display: block">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    // 退出登录
    logout() {
      // 清除token信息
      this.$store.commit('user/removeToken')
      // 清空路由规则
      this.$store.commit('menu/clearMenuList')
      // 跳转登陆页面
      // this.$route.fullPath 记住当前退出页面的路由
      this.$router.push(`/login`)
      // this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  line-height: 64px;
  overflow: hidden;
  position: relative;
  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;

    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }

  .user-dropdown {
    color: #fff;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    display: flex;
    justify-content: center;
    align-items: center;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .name{
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
  }
}

.avatar-btn {
  margin-right: 50px;
}
</style>
