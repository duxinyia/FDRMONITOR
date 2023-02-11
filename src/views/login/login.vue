<template>
  <!-- 初版 -->
  <div class="login-page">
    <div class="container">
      <transition
        appear
        mode="in-out"
        :duration="1000"
        enter-active-class="animate__animated animate__fadeInRight"
        leave-active-class="animate__animated animate__zoomOut"
      >
        <div class="left" v-if="leftShow"></div>
      </transition>
      <div class="right">
        <!-- 按钮区域 -->
        <div class="form-container">
          <div class="form-title">用户登录</div>
          <el-form ref="form" :rules="rules" :model="form">
            <el-form-item prop="name">
              <el-input prefix-icon="el-icon-user" placeholder="工號" v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="paw">
              <el-input
                prefix-icon="el-icon-lock"
                placeholder="密碼"
                show-password
                v-model.trim="form.paw"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                round
                type="primary"
                class="login-btn"
                @keyup.enter.native="toLogin"
                @click="toLogin"
                :loading="btnLoading"
                :disabled="btnLoading"
              >{{ btnLoading ? "登录中~" : "登录" }}</el-button>
            </el-form-item>
            <div class="forget-pwd" @click="forgetPwd">忘記密碼</div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 描述框 -->
    <div class="copyright-info">
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
    <!-- 切换不同的登录 -->
    <!-- <div class="every-login">
      <div class="item" v-for="(item, index) in lgoinInfo" :key="index" @click="toLoginPage(item)">
        {{ index }}
      </div>
    </div>-->
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
::v-deep .el-input {
  width: 80%;
}
::v-deep .el-input__inner {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 1px solid #dcdfe6;
  border-radius: 0px;
}
::v-deep {
  .el-form-item__error {
    left: 10%;
  }
}
::v-deep .el-checkbox__label {
  padding-left: 5px;
}
.login-page {
  width: 100%;
  height: 100%;
  background: linear-gradient(300deg, #415381 20%, #537bcb);
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    height: 400px;
    display: flex;
    box-shadow: 0 0 10px #0c1e4b;
    .left {
      width: 250px;
      flex: 3;
      background: linear-gradient(120deg, #3498db, #8e44ad);
      padding: 20px 0px 0px 20px;
    }
    .right {
      flex: 4;
      text-align: center;
      color: #000;
      background: #fff;
      width: 380px;
      .form-container {
        margin-top: 80px;
        .form-title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 15px;
        }
        .login-btn {
          width: 80%;
          background: linear-gradient(to right, #4288d2, #6569c1);
        }
        .forget-pwd {
          width: fit-content;
          margin: auto;
          font-size: 15px;
          color: #ccc;
          cursor: pointer;
          &:hover {
            color: #409eff;
          }
        }
      }
    }
  }
  .copyright-info {
    position: fixed;
    bottom: 20px;
    font-size: 14px;
    text-align: center;
    /* color: #d3c9c9; */
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
@media screen and (max-width: 1280px) {
  .login-page {
    .container {
      width: 300px;
      .left {
        display: none;
      }
    }
  }
}
</style>
