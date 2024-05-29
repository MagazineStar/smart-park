<template>
  <div class="login_body">
    <div class="bg" />
    <div class="box">
      <div class="title">智慧园区-登录</div>
      <!-- 表单校验的四要素 -->
      <!-- 1. el-form :model 对应的值 是表单对应的数据对象 -->
      <!-- 2. el-form :rules 对应的校验规则 -->
      <!-- 3. el-from-item prop 表示要校验哪个字段 -->
      <!-- 4. 表单元素 (el-input,el-checkbox...) v-model -->
      <el-form ref="form" :model="loginForm" :rules="rules">
        <el-form-item label="账号" prop="username">
          <el-input v-model="loginForm.username" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" show-password />
        </el-form-item>

        <el-form-item prop="remember">
          <el-checkbox v-model="rememberMe">记住我</el-checkbox>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="login_btn" @click="handleLogin()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { FORM_KET } from '@/constants/KEY'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rememberMe: false,
      rules: {
        username: [
          // tiggers:['blur','change'] 表示失去焦点和输入时触发校验
          // { required: true, message: '用户名不能为空', tirggers: ['blur', 'change'] }
          { required: true, message: '用户名不能为空', tiggers: 'bulr' }
        ],
        password: [
          { required: true, message: '密码不能为空', tiggers: 'blur' }
        ]
      }
    }
  },
  created() {
    const loginData = localStorage.getItem(FORM_KET)
    // 先判断 有没有存储用户信息
    if (loginData) {
      this.loginForm.username = JSON.parse(loginData).username
      this.loginForm.password = JSON.parse(loginData).password
      this.rememberMe = true
    }
  },
  methods: {
    handleLogin() {
      // this.$refs['form']
      this.$refs.form.validate(async(flag) => {
        if (!flag) return
        await this.$store.dispatch('user/loginAction', this.loginForm)
        // 判断用户是否点击记住我，如果点击则将用户信息存入localStorage
        if (this.rememberMe) {
          localStorage.setItem(FORM_KET, JSON.stringify(this.loginForm))
        } else {
          localStorage.removeItem(FORM_KET)
          this.rememberMe = false
        }
        // this.$route.query.redirect 用于访问当前路由的查询参数
        // console.log(this.$route.query.redirect)
        if (this.$route.query.redirect) {
          this.$router.push(this.$route.query.redirect)
        } else {
          this.$router.push('/')
        }
        // console.dir() 则适用于查看对象的属性列表以及更详细的信息。
        // console.dir(error)
        // this.$message.error() 通知或消息提示方法，通常用于显示错误信息。
      })
    }
  }
}

</script>

<style scoped lang="scss">
.login_body {
  display: flex;
}

.bg {
  width: 60vw;
  height: 100vh;
  background: url('~@/assets/login.png') no-repeat;
  background-position: right top;
  background-size: cover;
}

.box {
  margin: 200px 10% 0;
  flex: 1;

  .title {
    padding-bottom: 76px;
    font-size: 26px;
    font-weight: 500;
    color: #1e2023;
  }

  ::v-deep() {
    .ant-form-item {
      display: flex;
      margin-bottom: 62px;
      flex-direction: column;
    }

    .ant-form-item-label label {
      font-size: 16px;
      color: #8b929d;
    }

    .ant-input,
    .ant-input-password {
      border-radius: 8px;
    }
  }
}

.login_btn {
  width: 100%;
}
</style>
