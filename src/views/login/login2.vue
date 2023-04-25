<template>
  <!-- 转动地球版 -->
  <div class="login-page">
    <div class="header">
      <h1 class="title">战情中心</h1>
      <div class="header-img"></div>
    </div>
    <div class="content">
      <div class="content-left"></div>
      <div class="conetent-right">
        <div class="form-container">
          <!-- <div class="form-title">登录</div> -->
          <el-form ref="form" :rules="rules" :model="form">
            <el-form-item prop="name">
              <el-input prefix-icon="el-icon-user" placeholder="工號" v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item prop="paw">
              <el-input prefix-icon="el-icon-lock" placeholder="密碼" show-password v-model.trim="form.paw"></el-input>
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
                >{{ btnLoading ? "登录中~" : "登录" }}</el-button
              >
            </el-form-item>
            <div class="forget-pwd" @click="forgetPwd">忘記密碼</div>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 描述框 -->
    <div class="footer">
      <div class="copyright">
        <i class="el-icon-collection-tag icon"></i>Copyright © 2022. Foxconn All rights reserved
      </div>
      <div class="author-info">
        <div>
          <span class="author"> <i class="el-icon-user-solid icon"></i>郭小龍/560-82583 </span>
          <span class="mail"> <i class="el-icon-message icon"></i>peng-peng.tian@mail.foxconn.com </span>
          &nbsp;&nbsp;
          <span class="author"> <i class="el-icon-user-solid icon"></i>吳思敏/560-23123 </span>
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
      window.open(process.env.VUE_APP_CHANGE_PWD)
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
::v-deep .el-form-item {
  margin-bottom: 30px;
}
::v-deep .el-input__inner {
  background: transparent !important;
  border: 1px solid #1296db !important;
}
// 改变input里的字体颜色
::v-deep input::-webkit-input-placeholder {
  color: #17a1e5;
  font-size: 15px;
}
::v-deep .el-checkbox__label {
  padding-left: 5px;
}
.login-page {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
  background: url("~@/assets/images/login-bg.jpg") no-repeat center center;
  .header {
    width: 50%;
    margin: 30px auto 0 auto;
    position: relative;
    text-align: center;
    color: #fff;
    .title {
      font-size: 40px;
      font-weight: bold;
      letter-spacing: 10px;
    }
    .header-img {
      background: url("~@/assets/images/login-header.png") no-repeat center center;
      background-size: 100%;
      position: absolute;
      top: 0.8em;
      width: 100%;
      height: 100px;
    }
  }
  .content {
    display: flex;
    justify-content: space-around;
    .content-left {
      width: 550px;
      height: 490px;
      opacity: 0.9;
      background: url("~@/assets/images/login-ball.png") no-repeat center center;
      background-size: 100%;
      /* animation: rotate 500s linear infinite; */
    }
    .conetent-right {
      width: 450px;
      height: 450px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: url("~@/assets/images/login-form.png") no-repeat center center;
      background-size: 100%;
      .form-container {
        width: 80%;
        margin: auto;
        text-align: center;
        .form-title {
          font-size: 26px;
          font-weight: 700;
          margin-bottom: 15px;
          color: #fff;
        }
        .login-btn {
          width: 100%;
          font-size: 18px;
          background: linear-gradient(to right, #4288d2, #00eaff);
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
  .footer {
    font-size: 14px;
    text-align: center;
    color: #d3c9c9;
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
    .content-left {
      display: none;
    }
  }
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>
