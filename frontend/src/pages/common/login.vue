<template lang="html">
  <div id="login-page" @keyup.enter="login">
    <div class="login-form">
      <div class="input-group">
        <div class="title">Dashboard</div>
        <el-input :autofocus="true" placeholder="请录入用户名，例如admin" v-model="username"></el-input>
      </div>
      <div class="input-group">
        <el-input placeholder="请录入密码，例如admin" type="password" v-model="password"></el-input>
      </div>
      <div class="input-group">
        <el-button @click.native="login" type="primary" :loading="isBtnLoading">{{btnText}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      isBtnLoading: false
    };
  },
  computed: {
    btnText() {
      if (this.isBtnLoading) return '登录中...';
      return '登录';
    }
  },
  methods: {
    login() {
      if (!this.username) {
        this.$message.error('请填写用户名！！！');
        return;
      }
      if (!this.password) {
        this.$message.error('请填写密码');
        return;
      }
      let loginParams = {username: this.username, password: this.password};
      this.isBtnLoading = true;
      if (loginParams.username === 'admin' && loginParams.password === 'admin') {
        // 设置用户信息，实际场景调用接口写数据
        localStorage.setItem('user', JSON.stringify({
          id: 1,
          username: 'admin',
          items: ['item_1', 'item_2', 'item_3']
        }));
        if (this.$route.query.redirect) {
          this.$router.push({path: this.$route.query.redirect});
        } else {
          this.$router.push({ path: '/' });
        }
      } else {
        this.$message.error('用户名密码不正确');
      }
      this.isBtnLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
  #login-page {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #efeeee;
    .login-form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 500px;
      height: 400px;
      border-radius: 10px;
      background: white;
      border: 1px #eaeaea solid;
      box-shadow: 0px 0px 25px #cac6c6;
      .title {
        color: #20a0ff;
        font-weight: bold;
        font-size: 40px;
        text-align: center;
        line-height: 2.2;
        font-family: sans-serif;
      }
      .input-group {
        margin-top: 30px;
        width: 80%;
        button {
          width: 100%;
        }
      }
    }
  }
</style>
