<template>
  <div class="login-page">
    <div class="wrapper">
      <el-image class="logo" :src="form_logo" fit="contain"></el-image>
      <transition
        appear
        mode="out-in"
        :duration="2000"
        enter-active-class="animate__animated animate__slideInDown"
      >
        <div class="form-container">
          <transition
            appear
            mode="in-out"
            :duration="2000"
            enter-active-class="animate__animated animate__fadeInRight"
          >
            <div class="top-container">
              <!-- <el-image class="logo" :src="form_logo" fit="contain"></el-image> -->
              <h1 class="title">戰情中心</h1>
            </div>
          </transition>
          <el-form class="form" ref="form" :rules="rules" :model="form">
            <transition
              appear
              mode="out-in"
              :duration="1000"
              enter-active-class="animate__animated animate__fadeInLeft"
            >
              <el-form-item prop="name">
                <el-input placeholder="工號" v-model.trim="form.name">
                  <i slot="prefix" style="display: flex; align-items: center">
                    <el-image style="width: 15px; height: 17px" :src="user_icon" fit="cover"></el-image>
                  </i>
                </el-input>
              </el-form-item>
            </transition>
            <transition
              appear
              mode="out-in"
              :duration="1000"
              enter-active-class="animate__animated animate__fadeInRight"
            >
              <el-form-item prop="paw">
                <el-input placeholder="密碼" show-password v-model.trim="form.paw">
                  <i slot="prefix" style="display: flex; align-items: center">
                    <el-image style="width: 15px; height: 17px" :src="lock_icon" fit="cover"></el-image>
                  </i>
                </el-input>
              </el-form-item>
            </transition>
            <transition
              appear
              mode="out-in"
              :duration="1000"
              enter-active-class="animate__animated animate__fadeInLeft"
            >
              <div class="forget-pwd" @click="forgetPwd">忘記密碼</div>
            </transition>
            <transition
              appear
              mode="out-in"
              :duration="1000"
              enter-active-class="animate__animated animate__backInUp"
            >
              <el-form-item>
                <el-button
                  round
                  type="primary"
                  class="login-btn"
                  @keyup.enter.native="toLogin"
                  @click="toLogin"
                  :loading="btnLoading"
                  :disabled="btnLoading"
                >{{ btnLoading ? "登 录 中 ~" : "登 录" }}</el-button>
              </el-form-item>
            </transition>
          </el-form>
        </div>
      </transition>
    </div>
    <transition
      appear
      mode="out-in"
      :duration="1000"
      enter-active-class="animate__animated animate__fadeInRight"
    >
      <!-- 描述框 -->
      <div class="footer">
        <div class="copyright">
          <i class="el-icon-collection-tag icon"></i>Copyright © 2022. Foxconn All rights reserved
        </div>
        <div class="author-info">
          <div>
            <span class="author">
              <i class="el-icon-user-solid icon"></i>郭小龍/5060-72227
            </span>
            <span class="mail">
              <i class="el-icon-message icon"></i>wwlh-mis-feweb@mail.foxconn.com
            </span>
            &nbsp;&nbsp;
            <span class="author">
              <i class="el-icon-user-solid icon"></i>吳思敏/5060-23123
            </span>
            <span class="mail">
              <i class="el-icon-message icon"></i>shannon.sm.wu@mail.foxconn.com
            </span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 切换不同的登录 -->
    <div class="every-login">
      <div
        class="item"
        v-for="(item, index) in lgoinInfo"
        :key="index"
        @click="toLoginPage(item)"
      >{{ index }}</div>
    </div>
  </div>
</template>
<script>
// 导入登录的接口地址
import { login } from "@/api/login.js"
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
      form_logo: require("@/assets/images/form-logo3.png"),
      lock_icon: require("@/assets/images/lock-icon.png"),
      user_icon: require("@/assets/images/user-icon.png"),
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
            // console.log("res======", res)
            // 表示用户名 和 密码正确
            this.$store.commit("user/SET_USER", { ...this.form, fullName: res.Resultvalue.Name })
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
::v-deep .el-input__prefix {
  /* margin: auto 15px; */
  margin: auto 0.7813vw;
  display: flex;
  align-items: center;
}
::v-deep .el-input__inner {
  /* padding-left: 50px; */
  padding-left: 2.6042vw;
  border: none;
  background: #f7f7f7;
}
::v-deep .el-form-item {
  margin-bottom: 30px;
}

.login-page {
  width: 100%;
  height: 100%;
  /* position: relative; */
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/images/login-bg4.png") no-repeat center center;
  .wrapper {
    text-align: center;
    .logo {
      /* width: 230px;
        margin-top: 25px;
        margin-bottom: 25px; */
      width: 15.625vw;
      margin-top: 1.3021vw;
      margin-bottom: 1.3021vw;
    }

    .form-container {
      /* padding-top: 80px; */
      width: 480px;
      height: 350px;
      background: #fff;
      /* background: url("~@/assets/images/form-container.png") no-repeat center center; */
      border-radius: 15px;
      .top-container {
        width: 80%;
        margin: auto;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .title {
          letter-spacing: 15px;
          margin: 30px auto;
          /* font-size: 25px; */
          font-size: 32px;
          /* font-size: 1.3021vw; */
          /* font-family: Adobe Heiti Std; */
          font-weight: normal;
          color: #00506e;
          /* line-height: 8px; */
          /* line-height: 0.4167vw; */
          font-weight: bold;
        }
      }
      .form {
        width: 80%;
        margin: 0 auto;
        .forget-pwd {
          width: fit-content;
          /* display: inline-block; */
          cursor: pointer;
          /* margin-top: 30px;
        margin-bottom: 20px; */
          margin-top: 1.5625vw;
          margin-bottom: 1.0417vw;
          text-align: right;
          /* font-size: 15px; */
          font-size: 0.7813vw;
          color: #333;
          &:hover {
            color: aqua;
          }
        }
        .login-btn {
          margin-top: 10px;
          width: 100%;
          /* width: 390px; */
          height: 53px;
          /* font-size: 20px; */
          font-size: 1.0417vw;
          font-weight: bold;
          /* background: linear-gradient(-90deg, #5039fb 0%, #008dff 100%); */
          background: linear-gradient(270deg, rgba(10, 49, 126, 1) 0%, rgba(50, 112, 235, 1) 100%);
          /* box-shadow: 0px 8px 18px 0px rgba(0, 138, 255, 0.41); */
          /* border-radius: 26px; */
          box-shadow: 0px 0.4167vw 0.9375vw 0vw rgba(0, 138, 255, 0.41);
          border-radius: 1.3542vw;
          cursor: pointer;
        }
      }
    }
  }
  .footer {
    position: fixed;
    /* bottom: 20px; */
    bottom: 1.0417vw;
    left: 0;
    right: 0;
    /* font-size: 14px; */
    font-size: 0.7292vw;
    text-align: center;
    color: #fff;
    .icon {
      /* margin-right: 4px; */
      margin-right: 0.2083vw;
      vertical-align: middle;
    }
    .author-info {
      /* margin-top: 2px; */
      margin-top: 0.1042vw;
      .author {
        /* margin-right: 10px; */
        margin-right: 0.5208vw;
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
