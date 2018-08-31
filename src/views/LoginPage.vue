/*
 * @Author: zhouyou@werun 
 * @Descriptions: 登录页面 
 * @TodoList:
 *   1. 保存密码功能待添加，不过因为考虑到 chrome 的密码管理很方便，该功能以后有必要时再添加
 *   3. 忘记密码功能待添加 
 * @Date: 2018-08-25 20:46:08 
 * @Last Modified by: zhouyou@werun
 * @Last Modified time: 2018-08-29 20:43:39
 */

<template>
  <div id="login-page">
    <a-layout class="layout">
      <a-layout-content>
        <a-row type="flex"
               justify="center">
          <a-col :span="6">
            <div class="content">
              <h2 class="title">东方地毯后台管理系统</h2>
              <!-- 登录表单 -->
              <a-form @submit="login"
                      :autoFormCreate="(form)=>{this.form = form}">
                <a-form-item fieldDecoratorId="userName"
                             :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入账户名!' }]}">
                  <a-input placeholder="账户名"
                           v-model="userName"
                           size="large">
                    <a-icon slot="prefix"
                            type="user" />
                  </a-input>
                </a-form-item>
                <a-form-item fieldDecoratorId="password"
                             :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }]}">
                  <a-input type="password"
                           placeholder="密码"
                           v-model="password"
                           size="large">
                    <a-icon slot="prefix"
                            type="lock" />
                  </a-input>
                </a-form-item>
                <a-form-item>
                  <a-checkbox class='login-form-remember'>记住我</a-checkbox>
                  <a class='login-form-forgot'
                     href='javascripy:;'>忘记密码？</a>
                  <a-button class='login-form-button'
                            type='primary'
                            htmlType='submit'
                            :loading="loading">
                    登录
                  </a-button>
                </a-form-item>
              </a-form>
            </div>
          </a-col>
        </a-row>
      </a-layout-content>
      <!-- 网站信息 -->
      <a-layout-footer class="footer">
        Copyright(c) 2005-2018 东方地毯 All Rights Reserved
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import qs from "qs";
import { mapActions } from "vuex";
import { hex_md5 } from "../js/md5.js";
import * as urls from "../js/post_urls.js";
import * as paths from "../js/router_paths.js";

export default {
  name: "LoginPage",
  data: function() {
    return {
      userName: "",
      password: "",

      loading: false
    };
  },
  methods: {
    ...mapActions(["updateUserData"]),

    /**
     * @description 登录
     * @param {object} event
     * @returns
     */
    login: function(event) {
      // 阻止表单默认提交行为
      event.preventDefault();

      const self = this;

      // 表单验证
      this.form.validateFields(function(error, values) {
        // 验证成功
        if (!error) {
          self.loading = true;

          var postData = {
            number: self.userName,
            password: hex_md5(self.password) // 密码使用md5加密
          };

          self.$axios
            .post(urls.MES_LOGIN_URL, qs.stringify(postData))
            .then(function(response) {
              var data = response.data;

              if (data.success) {
                self.$message.success("登录成功！");

                // 写入用户信息到cookie
                self.$cookie.setCookie("mes_user_name", data.data.name);
                self.$cookie.setCookie("mes_user_id", data.data.id);

                // 更新全局状态
                self.updateUserData();

                // 跳转到首页
                self.$router.push(paths.MES_HOME_PAGE_PATH);
              } else {
                self.$message.error(data.message);
              }
            });
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$background_color: #fff;
$background_image_url: "../assets/images/login_background.png";

.layout {
  padding-top: 150px;
  height: 940px;

  background: url($background_image_url);

  .content {
    border-radius: 10px;
    padding: 50px;
    height: 420px;

    background: $background_color;

    .title {
      margin-bottom: 50px;

      font-size: 25px;
    }

    .login-form-remember {
      float: left;
    }

    .login-form-forgot {
      float: right;
    }

    .login-form-button {
      width: 100%;
    }
  }
}
</style>

