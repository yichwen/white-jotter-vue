<template>
  <body id="paper">
    <el-form
      :model="loginForm"
      :rules="rules"
      class="login-container"
      label-position="left"
      label-width="0px"
      v-loading="loading"
    >
      <h3 class="login-title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="账号"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="密码"/>
      </el-form-item>
      <el-checkbox class="login_remember" v-model="checked" label-position="left">
        <span>记住密码</span>
      </el-checkbox>
      <el-form-item style="width:100%">
        <el-button type="primary" style="width:40%;background:#505458;border:none" v-on:click="login">登录</el-button>
        <router-link to="register">
          <el-button type="primary" style="width:40%;background:#505458;border:none">注册</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </body>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      rules: {
        username: [{required: true, message: '用户名不能为空', trigger: 'blur'}],
        password: [{required: true, message: '密码不能为空', trigger: 'blur'}]
      },
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      checked: true, // 记住密码
      loading: false
    }
  },
  methods: {
    login () {
      this.$axios
        .post('/login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(successResponse => {
          if (successResponse.data.code === 200) {
            const { username } = this.loginForm
            const userData = {
              username,
              token: successResponse.data.result
            }
            // 当登录成功后，调用 login mutation, this.loginForm 将会被设置到 state.user
            this.$store.commit('login', userData)
            const path = this.$route.query.redirect
            this.$router.replace({ path: path === '/' || path === undefined ? '/admin/dashboard' : path })
          }
        })
        .catch(failResponse => {
        })
    }
  }
}
</script>

<style>

#paper {
  background:url("../assets/img/bg/eva.jpg") no-repeat;
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}

.login_remember {
  margin: 0px 0px 35px 0px;
  text-align: left;
}
</style>
