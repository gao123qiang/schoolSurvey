<template>
    <div class="login-container">
        <el-alert
            title="欢迎访问school survey页面，欢迎大家来指正"
            type="success"
            :closable="false"
            style="position: fixed"
        ></el-alert>
        <el-row>
            <el-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16">
                <div style="color: transparent">占位符</div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
                <el-form
                    :model="form"
                    ref="form"
                    :rules="rules"
                    class="login-form"
                    label-position="left"
                >
                    <div class="title">hello !</div>
                    <div class="title-tips">欢迎来到{{ title }}!!</div>
                    <el-form-item style="margin-top: 40px;" prop="username">
                        <span class="svg-container svg-container-admin">
                            <vab-icon :icon="['fas', 'user']"></vab-icon>
                        </span>
                        <el-input
                            v-model.trim="form.username"
                            v-focus
                            placeholder="请输入用户名"
                            tabindex="1"
                            type="text"
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <span class="svg-container">
                            <vab-icon :icon="['fas', 'lock']"></vab-icon>
                        </span>
                        <el-input
                            ref="password"
                            :key="passwordType"
                            v-model.trim="form.password"
                            :type="passwordType"
                            tabindex="2"
                            placeholder="请输入密码"
                            @keyup.enter.native="handleLogin"
                        ></el-input>
                        <span v-if="passwordType === 'password'"
                        class="show-password"
                        @click="handlePassword">
                            <vab-icon :icon="['fas', 'eye-slash']"></vab-icon>
                        </span>
                        <span v-else class="show-password" @click="handlePassword">
                            <vab-icon :icon="['fas', 'eye']"></vab-icon>
                        </span>
                    </el-form-item>
                    <el-button
                        :loading="loading"
                        class="login-btn"
                        type="primary"
                        @click="handleLogin"
                    >登录</el-button>
                    <el-button class="register-btn">
                        <router-link to="/login">
                            <div>注册</div>
                        </router-link>
                    </el-button>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import { isPassword } from "utils/validate";

    export default {
    name: "Login",
    directives: {
      focus: {
        inserted(el) {
          el.querySelector("input").focus();
        }
      }
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        let p = /^\w\w{7, 11}$/;
        if ("" === value) {
          callback(new Error("用户名不能为空"));
        } else if (!p.test(value)) {
          callback(new Error("用户名由8-12位的字母或者数字组成"));
        } else {
          callback();
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) {
          callback(new Error("密码由6-12位的字母和数字组成"))
        } else {
          callback();
        }
      }

      return {
        title: this.$baseTitle,
        form: {
          username: "",
          password: "",
        },
        rules: {
          username: [
            {
              required: true,
              trigger: "blur",
              validator: validateUsername,
            },
          ],
          password: [
            {
              required: true,
              trigger: "blur",
              validator: validatePassword,
            }
          ]
        },
        loading: false,
        passwordType: "password",
        redirect: undefined,
      }
    },
    created() {
      document.body.style.overflow = "hidden";
    },
    beforeDestroy() {
      document.body.style.overflow = "auto";
    },
    mounted() {
      this.form.username = "gaoadmin";
      this.form.password = "123456";
    },
    methods: {
      //是否要显示密码
      handlePassword() {
        //是否要显示密码
        this.passwordType === "password" ? (this.passwordType = "") : (this.passwordType = "password")
        this.$nextTick(() => {
          this.$refs.password.focus();
        });
      },
      //登录按钮函数
      handleLogin() {
        
      }
    }

    };
</script>

<style lang="scss" scoped>
    .login-container {
        height: 100vh;
        background: url("~assets/img/login_imgs/background.jpg") center center fixed no-repeat;
        background-size: cover;

        .title {
            font-size: 54px;
            font-weight: 500;
            color: rgba(14, 18, 26, 1);
        }

        .title-tips {
            margin-top: 29px;
            font-size: 26px;
            font-weight: 400;
            color: rgba(14, 18, 26, 1);
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .login-btn {
            display: inherit;
            width: 220px;
            height: 60px;
            margin-top: 5px;
            border: 0;

            &:hover {
                opacity: 0.9;
            }
        }

        .register-btn {
            margin-top: 5px;
            width: 110px;
            height: 30px;
            border: 0;
        }

        .login-form {
            position: relative;
            max-width: 100%;
            margin: calc((100vh - 425px) / 2) 10% 10%;
            overflow: hidden;

            .forget-password {
                width: 100%;
                margin-top: 40px;
                text-align: left;

                .forget-pass {
                    width: 129px;
                    height: 19px;
                    font-size: 20px;
                    font-weight: 400;
                    color: rgba(92, 102, 240, 1);
                }
            }
        }

        .tips {
            margin-bottom: 10px;
            font-size: $base-font-size-default;
            color: $base-color-white;

            span {
                &:first-of-type {
                    margin-right: 16px;
                }
            }
        }

        .title-container {
            position: relative;

            .title {
                margin: 0 auto 40px auto;
                font-size: 34px;
                font-weight: bold;
                color: $base-color-blue;
                text-align: center;
            }
        }

        .svg-container {
            position: absolute;
            top: 14px;
            left: 15px;
            z-index: $base-z-index;
            font-size: 16px;
            color: #d7dee3;
            cursor: pointer;
            user-select: none;
        }

        .show-password {
            position: absolute;
            top: 14px;
            right: 25px;
            font-size: 16px;
            color: #d7dee3;
            cursor: pointer;
            user-select: none;
        }

        ::v-deep {
            .el-form-item {
                padding-right: 0;
                margin: 20px 0;
                color: #454545;
                background: transparent;
                border: 1px solid transparent;
                border-radius: 2px;

                &__content {
                    min-height: $base-input-height;
                    line-height: $base-input-height;
                }

                &__error {
                    position: absolute;
                    top: 100%;
                    left: 18px;
                    font-size: $base-font-size-small;
                    line-height: 18px;
                    color: $base-color-red;
                }
            }

            .el-input {
                box-sizing: border-box;

                input {
                    height: 58px;
                    padding-left: 45px;
                    font-size: $base-font-size-default;
                    line-height: 58px;
                    color: $base-font-color;
                    background: #f6f4fc;
                    border: 0;
                    caret-color: $base-font-color;
                }
            }
        }
    }
</style>