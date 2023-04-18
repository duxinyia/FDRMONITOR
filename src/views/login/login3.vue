<template>
  <div class="login-page">
    <div class="form-container">
      <el-image class="logo" :src="form_logo" fit="contain"></el-image>
      <!-- <p class="welcome-text">你好，欢迎登陆战情中心</p> -->
      <el-form class="form" ref="form" :rules="rules" :model="form">
        <el-form-item prop="name">
          <el-input prefix-icon="el-icon-user" placeholder="工號" v-model.trim="form.name"></el-input>
        </el-form-item>
        <el-form-item prop="paw">
          <el-input prefix-icon="el-icon-lock" placeholder="密碼" show-password v-model.trim="form.paw"></el-input>
        </el-form-item>
        <div class="forget-pwd" @click="forgetPwd">忘記密碼</div>
        <el-form-item>
          <el-button
            round
            type="primary"
            class="login-btn"
            @keyup.enter.native="toLogin"
            @click="toLogin"
            :loading="btnLoading"
            :disabled="btnLoading"
            >{{ btnLoading ? "登录中~" : "登录" }}</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <!-- 描述框 -->
    <div class="footer">
      <div class="copyright">
        <i class="el-icon-collection-tag icon"></i>Copyright © 2022. Foxconn All rights reserved
      </div>
      <div class="author-info">
        <div>
          <span class="author"> <i class="el-icon-user-solid icon"></i>郭小龍/5060-72227 </span>
          <span class="mail"> <i class="el-icon-message icon"></i>wwlh-mis-feweb@mail.foxconn.com </span>
          &nbsp;&nbsp;
          <span class="author"> <i class="el-icon-user-solid icon"></i>吳思敏/5060-23123 </span>
          <span class="mail"> <i class="el-icon-message icon"></i>shannon.sm.wu@mail.foxconn.com </span>
        </div>
      </div>
    </div>
    <!-- 切换不同的登录 -->
    <div class="every-login">
      <div class="item" v-for="(item, index) in lgoinInfo" :key="index" @click="toLoginPage(item)">
        {{ index }}
      </div>
    </div>
  </div>
</template>
<script>
// 导入登录的接口地址
import { login } from "@/api/other/login.js"
export default {
  name: "login",
  data() {
    return {
      form: {
        name: "",
        paw: ""
      },
      rules: {
        name: [{ required: true, message: "請輸入工號", trigger: "blur" }],
        paw: [{ required: true, message: "請輸入密碼", trigger: "blur" }]
      },
      leftShow: true,
      btnLoading: false,
      isRemPwd: false,
      form_logo: require("@/assets/images/form-logo.png"),
      lgoinInfo: [
        {
          id: 1,
          to: "/login"
        },
        {
          id: 2,
          to: "/login1"
        },
        {
          id: 3,
          to: "/login2"
        },
        {
          id: 4,
          to: "/login3"
        }
      ]
    }
  },
  created() {
    window.addEventListener("keydown", this.keyDown)
  },
  methods: {
    toLoginPage(item) {
      if (this.$route.path == item.to) return
      this.$router.push(item.to)
    },
    toLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.btnLoading = true
          let res = await login(this.form)
          if (res.Resultflag == 1) {
            // 表示用户名 和 密码正确
            this.$store.commit("user/SET_USER", this.form)
            // 跳转页面
            this.$router.replace({ name: "overview" })
          }
          this.btnLoading = false
          this.$refs["form"].resetFields()
        } else {
          return false
        }
      })
    },
    // 忘记密码
    forgetPwd() {
      window.open(this.$globalData.RESET_PWD_URL)
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        this.toLogin()
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keyDown, false)
  }
}
</script>
<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  position: relative;
  background: url("~@/assets/images/login-bg3.png") no-repeat center center;
  .form-container {
    position: absolute;
    right: 14%;
    top: 30%;
    /* width: 531px; */
    width: 460px;
    /* height: 470px; */
    height: 370px;
    background: url("~@/assets/images/form-container.png") no-repeat center center;
    /* background: #fff; */
    border-radius: 10px;
    /* background-size: 100%; */
    text-align: center;
    .logo {
      width: 250px;
      margin: 21px auto;
    }
    /* .welcome-text {
      font-size: 26px;
      font-weight: bold;
      margin-bottom: 24px;
    } */
    .form {
      /* width: 286px; */
      width: 70%;
      margin: 0 auto;
      .forget-pwd {
        width: fit-content;
        cursor: pointer;
        margin-top: 30px;
        margin-bottom: 20px;
        text-align: left;
        font-size: 15px;
        color: #333;
        &:hover {
          color: aqua;
        }
      }
      .login-btn {
        width: 100%;
        /* width: 390px; */
        height: 53px;
        font-size: 20px;
        font-weight: bold;
        background: linear-gradient(-90deg, #5039fb 0%, #008dff 100%);
        box-shadow: 0px 8px 18px 0px rgba(0, 138, 255, 0.41);
        border-radius: 26px;
        cursor: pointer;
      }
    }
  }
  .footer {
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    font-size: 14px;
    text-align: center;
    color: #fff;
    .icon {
      margin-right: 4px;
      vertical-align: middle;
    }
    .author-info {
      margin-top: 2px;
      .author {
        margin-right: 10px;
      }
    }
  }
}
.every-login {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  color: #fff;
  .item {
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    border: 1px solid #8e44ad;
    margin-left: 20px;
    cursor: pointer;
    &:hover {
      background: #8e44ad;
      color: #fff;
    }
  }
}
</style>
