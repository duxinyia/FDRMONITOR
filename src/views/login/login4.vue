<template>
  <div class="login-page">
    <!-- 显示战情中心 -->
    <!-- <div class="title-container">
      <p class="title">战情中心</p>
      <p class="english-name">Intelligence Center</p>
    </div>-->
    <!-- 显示logo -->
    <el-image class="logo" :src="logoUrl" afit="cover"></el-image>
    <!-- 表单登录 -->
    <div class="form-container">
      <div class="form-title">用户登录</div>
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item prop="name">
          <el-input class="workno" placeholder="工號" v-model.trim="form.name">
            <el-image #prefix :src="lockUrl" fit="cover"></el-image>
          </el-input>
        </el-form-item>
        <el-form-item prop="paw">
          <el-input class="password" placeholder="密碼" show-password v-model.trim="form.paw"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
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
    <!-- 描述框 -->
    <div class="copyright-info">
      <div class="copyright">
        <i class="el-icon-collection-tag icon"></i>
        Copyright © 2022. Foxconn All rights reserved
        <span
          class="location"
          @click="toLocation"
        >{{port == '8085' ? '正式地址' : '测试地址'}}</span>
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
  </div>
</template>

<script>
// 导入登录的接口地址
import { login } from "@/api/login.js"
export default {
  name: "login4",
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
      lockUrl: require("@/assets/images/lock.png"),
      logoUrl: require("@/assets/images/new_logo.png"),
      port: window.location.port
      // http://10.147.214.111:8085/   http://10.147.214.130:8093/
    }
  },
  created() {
    window.addEventListener("keydown", this.keyDown)
  },
  methods: {
    // 登录的接口
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
    },
    toLocation() {
      if (this.port == 8085) {
        window.open("http://10.147.214.130:8093")
      } else {
        window.open("http://10.147.214.111:8085")
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.keyDown, false)
  }
}
</script>
<style lang="scss">
.workno {
  .el-input__inner {
    background: url("~@/assets/images/user.png") no-repeat 10px center;
    /* background-size: 16px 16px; */
    /* padding: 0px 10px 0px 40px; */
    background-size: 0.8333vw 0.8333vw;
    padding: 0px 0.5208vw 0px 2.0833vw;
    border: 1px solid #adb8ec;
    padding-left: 1px solid #adb8ec;
    position: relative;
    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 5px;
      top: 10px;
      width: 10px;
      height: 10px;
      background: red;
    }
  }
}
.password {
  .el-input__inner {
    background: url("~@/assets/images/lock.png") no-repeat 10px center;
    background-size: 16px 16px;
    padding: 0px 10px 0px 40px;
    /* background-size: 0.8333vw 0.8333vw;
    padding: 0px 0.5208vw 0px 2.0833vw; */
    border: 1px solid #adb8ec;
  }
}
</style>

<style lang="scss" scoped>
::v-deep .el-form-item {
  margin-bottom: 32px;
}
.login-page {
  width: 100%;
  height: 100%;
  min-width: 1920px;
  text-align: center;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("~@/assets/images/login-bg5.png") no-repeat center center;
  /* background-size: 100% 100%; */
  /* background-position: 0 -55px; */
  .logo {
    position: absolute;
    /* left: 40px;
    top: 30px; */
    top: 2.7778vh;
    left: 2.0833vw;
  }
  .title-container {
    position: absolute;
    /* top: 126px;
    left: 860px; */
    top: 6.5625vw;
    left: 44.7917vw;
    color: #fff;
    .title {
      font-size: 50px;
      line-height: 50px;
      margin-bottom: 10px;
    }
    .english-name {
      font-size: 25px;
    }
  }
  .form-container {
    margin-top: 100px;
    width: 350px;
    color: #6077ef;

    .form-title {
      font-size: 26px;
      font-weight: 700;
      margin-bottom: 25px;
    }
    .login-btn {
      width: 100%;
      font-size: 17px;
      /* background: linear-gradient(to right, #4288d2, #6569c1); */
      background: #6077ef;
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
  .copyright-info {
    position: fixed;
    bottom: 20px;
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
</style>
