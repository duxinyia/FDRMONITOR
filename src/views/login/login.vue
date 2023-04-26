<template>
  <div class="login-page">
    <!-- 公司logo -->
    <div class="top-container">
      <el-image :src="left_logo" />
      <el-image class="center_logo" :src="center_logo" />
      <el-image :src="right_logo" />
    </div>
    <!-- 登录框 -->
    <div class="form-container">
      <div class="left-container">
        <el-image class="left-img" :src="left_img" />
      </div>
      <div class="right-container">
        <div class="form-title">战情中心</div>
        <el-form ref="form" :rules="rules" :model="form">
          <el-form-item prop="name">
            <el-input prefix-icon="el-icon-user" placeholder="工號" v-model.trim="form.name"></el-input>
          </el-form-item>
          <el-form-item prop="paw">
            <el-input prefix-icon="el-icon-lock" placeholder="密碼" show-password v-model.trim="form.paw"></el-input>
          </el-form-item>
          <!-- 记住密码和忘记密码 -->
          <div class="pwd-container">
            <el-checkbox v-model="rempwd" @change="pwdChange">记住密码</el-checkbox>
            <span class="forpwd" @click="forgetPwd">忘记密码</span>
          </div>
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
    </div>
    <!-- 底部描述框 -->
    <div class="copyright-info">
      <div class="copyright">
        <i class="el-icon-collection-tag icon"></i>
        Copyright © 2022. Foxconn All rights reserved
        <span class="location" @click="toLocation">
          {{ port == "8085" ? "正式地址" : "测试地址" }}
        </span>
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
  </div>
</template>

<script>
// 导入登录的接口地址
import { login } from "@/api/other/login.js"
// 导入cookie
import cookie from "@/utils/cookie.js"
export default {
  name: "login",
  data() {
    return {
      rempwd: false,
      btnLoading: false,
      port: window.location.port,
      left_logo: require("@/assets/images/other/left_logo.png"),
      center_logo: require("@/assets/images/other/new_logo.png"),
      right_logo: require("@/assets/images/other/right_logo.png"),
      left_img: require("@/assets/images/other/_left_img.png"),
      form: {
        name: "",
        paw: ""
      },
      rules: {
        name: [{ required: true, message: "請輸入工號", trigger: "blur" }],
        paw: [{ required: true, message: "請輸入密碼", trigger: "blur" }]
      }
    }
  },
  created() {
    window.addEventListener("keydown", this.keyDown)
    // 取出cookie的用户名和密码
    let name = cookie.getCookie("name") || ""
    let paw = cookie.getCookie("paw") || ""
    this.form = { name, paw }
    if (name && paw) {
      this.rempwd = true
    }
  },
  methods: {
    // 登录的方法
    toLogin() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          this.btnLoading = true
          let res = await login(this.form)
          if (res.Resultflag == 1) {
            // 表示用户名 和 密码正确
            this.$store.commit("user/SET_USER", {
              ...this.form,
              fullName: res.Resultvalue.Name
            })
            // 跳转页面
            this.$router.replace({ name: "overview" }).catch(() => {})
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
      window.open(process.env.VUE_APP_CHANGE_PWD)
    },
    keyDown(e) {
      if (e.keyCode == 13) {
        this.toLogin()
      }
    },
    // 判断是否是测试环境还是正式环境
    toLocation() {
      if (this.port == 8085) {
        window.open(this.$globalData.PRODUCTION_ADDRESS)
      } else {
        window.open(this.$globalData.TEST_ADDRESS)
      }
    },
    pwdChange(value) {
      console.log("value", value)
      if (!value) {
        cookie.setCookie("", "", 0)
      } else {
        if (this.btnLoading == false) {
          cookie.setCookie(this.form.name, this.form.paw, 7)
        }
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keyDown, false)
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-input {
  width: 80%;
}
::v-deep .el-input__inner {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid #dcdfe6;
  border-radius: 0px;
  background: transparent;
  color: #fff;
}
::v-deep .el-form-item__error {
  left: 10%;
}
::v-deep .el-form-item {
  margin-bottom: 32px;
}
::v-deep .el-checkbox__label {
  color: #fff;
}
::v-deep .el-input__icon {
  color: #fff;
  font-size: 18px;
}
::v-deep input::placeholder {
  color: #fff;
}
.login-page {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/images/other/login-bg7.png") no-repeat center center;
  background-size: 100% 100%;
  .top-container {
    position: fixed;
    top: 60px;
    display: flex;
    align-items: center;
    vertical-align: middle;
    .center_logo {
      width: 320px;
      padding: 0 20px;
      margin-bottom: 10px;
    }
  }
  .form-container {
    width: 800px;
    height: 420px;
    display: flex;
    .left-container {
      flex: 1;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 9px 0px 0px 9px;
      .left-img {
        width: 80%;
      }
    }
    .right-container {
      padding-top: 70px;
      flex: 1;
      border-radius: 0px 9px 9px 0px;
      text-align: center;
      color: #fff;
      background: linear-gradient(0deg, #003973, #64b3f4);
      .form-title {
        font-size: 26px;
        font-weight: 700;
        margin-bottom: 20px;
        letter-spacing: 8px;
      }
      .pwd-container {
        display: flex;
        padding: 0 10%;
        margin-bottom: 30px;
        justify-content: space-between;
        .forpwd {
          cursor: pointer;
          font-size: 14px;
          &:hover {
            color: #409eff;
          }
        }
      }
      .login-btn {
        width: 190px;
        background: #fff;
        color: #196bf1;
        font-size: 20px;
        font-weight: bold;
        box-shadow: 5px 6px 5px 0px #134aa2;
        border-radius: 23px;
      }
    }
  }
  .copyright-info {
    position: fixed;
    bottom: 2.6042vw;
    font-size: 14px;
    margin: auto;
    text-align: center;
    color: #fff;
    .copyright {
      .location {
        margin-left: 10px;
        text-decoration: underline;
        cursor: pointer;
        color: yellow;
      }
    }
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
@media screen and (max-width: 1280px) {
  .login-page {
    .form-container {
      width: 450px;
      .left-container {
        display: none;
      }
      .right-container {
        width: 500px !important;
      }
    }
  }
}
</style>
